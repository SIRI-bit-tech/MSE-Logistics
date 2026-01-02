import { Injectable, HttpStatus } from "@nestjs/common"
import type { JwtService } from "@nestjs/jwt"
import type { PrismaService } from "../prisma/prisma.service"
import { ManagementClient } from "auth0"
import { SafeException } from "../../common/exceptions/safe-error.exception"

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
