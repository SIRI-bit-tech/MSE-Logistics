import { Injectable, type CanActivate, type ExecutionContext, HttpStatus } from "@nestjs/common"
import type { Reflector } from "@nestjs/core"
import { GqlExecutionContext } from "@nestjs/graphql"
import { SafeException } from "../exceptions/safe-error.exception"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>("roles", context.getHandler())

    if (!roles) {
      return true
    }

    const gqlContext = GqlExecutionContext.create(context)
    const user = gqlContext.getContext().user

    if (!user) {
      throw new SafeException({
        statusCode: HttpStatus.FORBIDDEN,
        userMessage: "Access denied. User authentication required.",
        internalMessage: "User not found in context",
        errorCode: "USER_NOT_AUTHENTICATED",
      })
    }

    if (!roles.includes(user.role)) {
      throw new SafeException({
        statusCode: HttpStatus.FORBIDDEN,
        userMessage: "Access denied. You do not have permission to access this resource.",
        internalMessage: `User role '${user.role}' not in allowed roles: ${roles.join(", ")}`,
        errorCode: "INSUFFICIENT_PERMISSIONS",
        context: { userRole: user.role, requiredRoles: roles },
      })
    }

    return true
  }
}
