import { Injectable, HttpStatus, UnauthorizedException, Logger } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "../prisma/prisma.service"
import { ManagementClient, AuthenticationClient } from "auth0"
import { SafeException } from "../../common/exceptions/safe-error.exception"
import { LoginInput, RegisterInput, AuthResponse } from "./auth.types"
import { UserRole } from "../../graphql/schema/enums"

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)
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
      // Note: This method now expects the frontend to handle Auth0 authentication
      // and pass the access token. The frontend should use Auth0's Universal Login
      // with Authorization Code Flow + PKCE for security.
      
      // For now, we'll validate the token if provided, or throw an error
      // indicating that proper Auth0 integration is required
      throw new SafeException({
        statusCode: HttpStatus.NOT_IMPLEMENTED,
        userMessage: "Direct password authentication is deprecated. Please use Auth0 Universal Login.",
        internalMessage: "ROPG flow has been disabled for security. Implement Authorization Code Flow + PKCE.",
        errorCode: "DEPRECATED_AUTH_METHOD",
        context: { 
          recommendation: "Use Auth0 Universal Login with Authorization Code Flow + PKCE",
          securityNote: "Resource Owner Password Grant is deprecated and insecure"
        },
      })
    } catch (error) {
      if (error instanceof SafeException) {
        throw error
      }
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Authentication failed. Please try again.",
        internalMessage: error instanceof Error ? error.message : "Login failed",
        errorCode: "LOGIN_FAILED",
        context: { email: input.email },
      })
    }
  }

  // New method to handle Auth0 token validation (for Authorization Code Flow)
  async validateAuth0Token(accessToken: string): Promise<AuthResponse> {
    try {
      // Validate the access token with Auth0
      const userInfoResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!userInfoResponse.ok) {
        throw new UnauthorizedException("Invalid access token")
      }

      const userInfo = await userInfoResponse.json() as { sub: string; email?: string; name?: string }
      
      if (!userInfo.sub) {
        throw new UnauthorizedException("Invalid access token")
      }

      // Find or create user in our database
      let user = await this.prisma.user.findUnique({
        where: { auth0Id: userInfo.sub },
      })

      if (!user) {
        // Create user if doesn't exist
        user = await this.createUserFromAuth0(userInfo.sub, userInfo.email || "")
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
          phoneNumber: user.phone || undefined,
          avatar: user.profileImage || undefined,
          role: user.role,
          isActive: user.status === 'ACTIVE',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Token validation failed. Please try again.",
        internalMessage: error instanceof Error ? error.message : "Token validation failed",
        errorCode: "TOKEN_VALIDATION_FAILED",
      })
    }
  }

  /**
   * Synchronizes Auth0 user during initial authentication with token validation
   * This method validates the Auth0 access token to ensure the caller owns the identity
   * 
   * @param accessToken - Auth0 access token to validate ownership
   * @param auth0Id - Auth0 user identifier
   * @param email - User email address
   * @param firstName - User first name
   * @param lastName - User last name
   * @param phone - Optional phone number
   * 
   * @throws UnauthorizedException when token is invalid or doesn't match the provided auth0Id
   * 
   * @security This method validates token ownership before creating/syncing user data.
   *           All new users are created with CUSTOMER role by default.
   */
  async syncAuth0UserOnAuthWithToken(
    accessToken: string,
    auth0Id: string, 
    email: string, 
    firstName: string,
    lastName: string,
    phone?: string
  ): Promise<AuthResponse> {
    try {
      // Validate the access token with Auth0 and get user info
      const userInfoResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!userInfoResponse.ok) {
        throw new UnauthorizedException("Invalid access token")
      }

      const userInfo = await userInfoResponse.json() as { sub: string; email?: string; name?: string }
      
      if (!userInfo.sub) {
        throw new UnauthorizedException("Invalid access token")
      }

      // Validate that the token belongs to the user being synced
      if (userInfo.sub !== auth0Id) {
        throw new UnauthorizedException("Access token does not match the provided Auth0 ID")
      }

      // Now safely sync the user data since we've validated token ownership
      return this.syncAuth0User(
        auth0Id, 
        email, 
        firstName, 
        lastName, 
        phone, 
        undefined, // No authenticated user context needed since we validated the token
        true // Allow unauthenticated access since we validated the token
      )
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "User synchronization failed. Please try again.",
        internalMessage: error instanceof Error ? error.message : "Token validation and sync failed",
        errorCode: "SYNC_WITH_TOKEN_FAILED",
        context: { auth0Id, email },
      })
    }
  }

  /**
   * Synchronizes Auth0 user data with the local database
   * 
   * @param auth0Id - Auth0 user identifier
   * @param email - User email address
   * @param firstName - User first name
   * @param lastName - User last name
   * @param phone - Optional phone number
   * @param authenticatedUser - Current authenticated user context (for validation)
   * @param allowUnauthenticated - Whether to allow unauthenticated access (for initial login/registration)
   * 
   * @throws UnauthorizedException when authentication is required but not provided
   * @throws UnauthorizedException when authenticated user tries to sync different user's data
   * 
   * @security All new users are created with CUSTOMER role by default.
   *           Role elevation requires separate admin approval process.
   */
  async syncAuth0User(
    auth0Id: string, 
    email: string, 
    firstName: string,
    lastName: string,
    phone?: string, 
    authenticatedUser?: { id: string; email: string; role: string; auth0Id: string },
    allowUnauthenticated: boolean = false
  ): Promise<AuthResponse> {
    try {
      // Validate authentication requirements
      if (!allowUnauthenticated && !authenticatedUser) {
        throw new UnauthorizedException('Authentication required for user synchronization')
      }

      // If authenticated user is provided, validate caller identity
      if (authenticatedUser && authenticatedUser.auth0Id !== auth0Id) {
        throw new UnauthorizedException('You can only sync your own user data')
      }

      // Find or create user in our database
      let user = await this.prisma.user.findUnique({
        where: { auth0Id },
      })

      if (!user) {
        // Create new user - ALWAYS defaults to CUSTOMER role for security
        // Role elevation requires admin approval through separate process
        user = await this.prisma.user.create({
          data: {
            auth0Id,
            email,
            firstName,
            lastName,
            phone: phone || null,
            role: UserRole.CUSTOMER, // Security: Always CUSTOMER, no user-controlled role assignment
          },
        })
        
        this.logger.log(`New user created with CUSTOMER role: ${email} (${auth0Id})`)
      } else {
        // Update existing user with new information (preserves existing role)
        user = await this.prisma.user.update({
          where: { auth0Id },
          data: {
            email,
            firstName,
            lastName,
            phone: phone || user.phone,
            // Note: Role is NOT updated here - requires admin action for role changes
          },
        })
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
          phoneNumber: user.phone || undefined,
          avatar: user.profileImage || undefined,
          role: user.role,
          isActive: user.status === 'ACTIVE',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error
      }
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "User synchronization failed. Please try again.",
        internalMessage: error instanceof Error ? error.message : "User sync failed",
        errorCode: "USER_SYNC_FAILED",
        context: { auth0Id, email },
      })
    }
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    let auth0UserId: string | null = null
    
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

      auth0UserId = auth0User.data.user_id

      // Parse full name
      const nameParts = input.fullName.trim().split(" ")
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(" ") || ""

      // Create user in our database - wrapped in try/catch for rollback
      let user
      try {
        user = await this.prisma.user.create({
          data: {
            email: input.businessEmail,
            firstName,
            lastName,
            phone: input.phoneNumber,
            role: "CUSTOMER",
            auth0Id: auth0User.data.user_id,
          },
        })
      } catch (dbError) {
        // Database creation failed - rollback Auth0 user
        try {
          await this.auth0Client.users.delete({ id: auth0UserId })
          console.error(`Auth0 user ${auth0UserId} deleted due to database creation failure:`, dbError)
        } catch (deleteError) {
          console.error(`Failed to delete Auth0 user ${auth0UserId} after database failure:`, deleteError)
          throw new SafeException({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            userMessage: "Registration failed and cleanup encountered issues. Please contact support.",
            internalMessage: `Database creation failed and Auth0 user deletion failed. Auth0 ID: ${auth0UserId}`,
            errorCode: "REGISTRATION_ROLLBACK_FAILED",
            context: { 
              email: input.businessEmail, 
              auth0UserId,
              dbError: dbError instanceof Error ? dbError.message : "Unknown database error",
              deleteError: deleteError instanceof Error ? deleteError.message : "Unknown deletion error"
            },
          })
        }

        // Auth0 user successfully deleted, throw original database error
        throw new SafeException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          userMessage: "Registration failed. Please try again.",
          internalMessage: `Database user creation failed: ${dbError instanceof Error ? dbError.message : "Unknown error"}`,
          errorCode: "DATABASE_USER_CREATION_FAILED",
          context: { email: input.businessEmail },
        })
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
          phoneNumber: user.phone || undefined,
          avatar: user.profileImage || undefined,
          role: user.role,
          isActive: user.status === 'ACTIVE',
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      }
    } catch (error) {
      if (error instanceof SafeException) {
        throw error
      }
      
      // If we have an Auth0 user ID and this is an unexpected error, try to clean up
      if (auth0UserId) {
        try {
          await this.auth0Client.users.delete({ id: auth0UserId })
          console.error(`Auth0 user ${auth0UserId} deleted due to unexpected registration error:`, error)
        } catch (deleteError) {
          console.error(`Failed to delete Auth0 user ${auth0UserId} after unexpected error:`, deleteError)
        }
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
