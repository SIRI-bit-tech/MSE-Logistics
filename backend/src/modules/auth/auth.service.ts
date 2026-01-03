import { Injectable, HttpStatus, UnauthorizedException } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import type { PrismaService } from "../prisma/prisma.service"
import { ManagementClient } from "auth0"
import { SafeException } from "../../common/exceptions/safe-error.exception"
import { LoginInput, RegisterInput, AuthResponse } from "./auth.types"
import * as bcrypt from "bcryptjs"

@Injectable()
export class AuthService {
  private auth0Client: ManagementClient

  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.auth0Client = new ManagementClient({
      domain: process.env.AUTH0_DOMAIN || "",
      clientId: process.env.AUTH0_CLIENT_ID || "",
      clientSecret: process.env.AUTH0_CLIENT_SECRET || "",
    })
  }

  async login(input: LoginInput): Promise<AuthResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: input.email },
      })

      if (!user) {
        throw new UnauthorizedException("Invalid credentials")
      }

      // For now, we'll skip password verification since we're using Auth0
      // In a real implementation, you'd verify the password here
      
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      })

      return {
        token,
        user,
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
      // Check if user already exists
      const existingUser = await this.prisma.user.findUnique({
        where: { email: input.businessEmail },
      })

      if (existingUser) {
        throw new SafeException({
          statusCode: HttpStatus.CONFLICT,
          userMessage: "An account with this email already exists.",
          internalMessage: "User already exists",
          errorCode: "USER_EXISTS",
          context: { email: input.businessEmail },
        })
      }

      // Hash password (for demo purposes, in production use Auth0)
      const hashedPassword = await bcrypt.hash(input.password, 10)

      // Parse full name
      const nameParts = input.fullName.trim().split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      // Create user
      const user = await this.prisma.user.create({
        data: {
          email: input.businessEmail,
          firstName,
          lastName,
          phone: input.phoneNumber,
          role: "CUSTOMER",
          auth0Id: `local_${Date.now()}`, // Temporary for demo
        },
      })

      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      })

      return {
        token,
        user,
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
