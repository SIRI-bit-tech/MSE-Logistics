import { Injectable, HttpStatus, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "../prisma/prisma.service"
import { ManagementClient, AuthenticationClient } from "auth0"
import { SafeException } from "../../common/exceptions/safe-error.exception"
import { LoginInput, RegisterInput, AuthResponse } from "./auth.types"

@Injectable()
export class AuthService {
  private auth0Client: ManagementClient
  private authClient: AuthenticationClient

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.auth0Client = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN || "",
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
    })

    this.authClient = new AuthenticationClient({
      domain: process.env.AUTH0_DOMAIN || "",
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
    })
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    try {
      // Authenticate with Auth0
      const auth0Response = await this.authClient.oauth.passwordGrant({
        username: input.email,
        password: input.password,
        scope: 'openid profile email',
      })

      if (!auth0Response.data.access_token) {
        throw new UnauthorizedException("Invalid credentials")
      }

      // Decode the ID token to get user info
      const idToken = auth0Response.data.id_token
      if (!idToken) {
        throw new UnauthorizedException("Invalid credentials")
      }

      // Decode JWT token (in production, verify signature)
      const payload = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString())
      
      // Find or create user in our database
      let user = await this.prisma.user.findUnique({
        where: { auth0Id: payload.sub },
      })

      if (!user) {
        // Create user if doesn't exist
        user = await this.createUserFromAuth0(payload.sub, payload.email)
      }

      // Generate our own JWT token
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
        auth0Id: user.auth0Id,
      })

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone || undefined,
          profileImage: user.profileImage || undefined,
          role: user.role,
          createdAt: user.createdAt,
        },
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Login failed. Please try again.",
        internalMessage: error instanceof Error ? error.message : "Login failed",
        errorCode: "LOGIN_FAILED",
        context: { email: input.email },
      })
    }
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    try {
      // Create user in Auth0
      const auth0User = await this.auth0Client.users.create({
        email: input.businessEmail,
        password: input.password,
        name: input.fullName,
        connection: 'Username-Password-Authentication', // Default Auth0 database connection
        user_metadata: {
          companyName: input.companyName,
          phoneNumber: input.phoneNumber,
          country: input.country,
        },
      })

      if (!auth0User.data.user_id) {
        throw new SafeException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          userMessage: "Registration failed. Please try again.",
          internalMessage: "Auth0 user creation failed",
          errorCode: "AUTH0_REGISTRATION_FAILED",
          context: { email: input.businessEmail },
        })
      }

      // Parse full name
      const nameParts = input.fullName.trim().split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      // Create user in our database
      const user = await this.prisma.user.create({
        data: {
          email: input.businessEmail,
          firstName,
          lastName,
          phone: input.phoneNumber,
          role: "CUSTOMER",
          auth0Id: auth0User.data.user_id,
        },
      })

      // Generate our own JWT token
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
        auth0Id: user.auth0Id,
      })

      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone || undefined,
          profileImage: user.profileImage || undefined,
          role: user.role,
          createdAt: user.createdAt,
        },
      }
    } catch (error) {
      if (error instanceof SafeException) {
        throw error
      }
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Registration failed. Please try again.",
        internalMessage: error instanceof Error ? error.message : "Registration failed",
        errorCode: "REGISTRATION_FAILED",
        context: { email: input.businessEmail },
      })
    }
  }

  async validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token)
      const user = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        email: user.email,
        role: user.role,
        auth0Id: user.auth0Id,
      }
    } catch (error) {
      return null
    }
  }

  async createUserFromAuth0(auth0Id: string, email: string) {
    try {
      return await this.prisma.user.upsert({
        where: { auth0Id },
        update: {},
        create: {
          auth0Id,
          email,
          firstName: email.split("@")[0],
          lastName: "",
          role: "CUSTOMER",
        },
      })
    } catch (error) {
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Failed to create user account. Please try again.",
        internalMessage: error instanceof Error ? error.message : "User creation failed",
        errorCode: "USER_CREATION_FAILED",
        context: { auth0Id },
      })
    }
  }

  async getUser(id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { id },
      })
    } catch (error) {
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Failed to retrieve user information. Please try again.",
        internalMessage: error instanceof Error ? error.message : "User retrieval failed",
        errorCode: "USER_RETRIEVAL_FAILED",
        context: { userId: id },
      })
    }
  }

  async getUserByAuth0Id(auth0Id: string) {
    try {
      return await this.prisma.user.findUnique({
        where: { auth0Id },
      })
    } catch (error) {
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Failed to retrieve user information. Please try again.",
        internalMessage: error instanceof Error ? error.message : "User retrieval failed",
        errorCode: "USER_RETRIEVAL_FAILED",
        context: { auth0Id },
      })
    }
  }

  async updateUser(id: string, data: any) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data,
      })
    } catch (error) {
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Failed to update user information. Please try again.",
        internalMessage: error instanceof Error ? error.message : "User update failed",
        errorCode: "USER_UPDATE_FAILED",
        context: { userId: id },
      })
    }
  }
}
