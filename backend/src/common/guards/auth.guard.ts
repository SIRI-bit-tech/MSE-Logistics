import { Injectable, type CanActivate, type ExecutionContext, HttpStatus } from "@nestjs/common"
import { GqlExecutionContext } from "@nestjs/graphql"
import type { AuthService } from "../../modules/auth/auth.service"
import { SafeException } from "../exceptions/safe-error.exception"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context)
    const { req } = gqlContext.getContext()

    const authHeader = req.headers.authorization
    if (!authHeader) {
      throw new SafeException({
        statusCode: HttpStatus.UNAUTHORIZED,
        userMessage: "Authentication required. Please provide a valid token.",
        internalMessage: "Missing authorization header",
        errorCode: "MISSING_AUTH_HEADER",
      })
    }

    const token = authHeader.replace("Bearer ", "")
    const user = await this.authService.validateToken(token)

    if (!user) {
      throw new SafeException({
        statusCode: HttpStatus.UNAUTHORIZED,
        userMessage: "Invalid or expired authentication token.",
        internalMessage: "Token validation failed",
        errorCode: "INVALID_TOKEN",
        context: { tokenPrefix: token.substring(0, 20) },
      })
    }

    req.user = user
    gqlContext.getContext().user = user

    return true
  }
}
