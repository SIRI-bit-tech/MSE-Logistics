import { Catch, HttpStatus, Logger } from "@nestjs/common"
import type { GqlExceptionFilter } from "@nestjs/graphql"
import { GraphQLError } from "graphql"
import { SafeException } from "../exceptions/safe-error.exception"

@Catch()
export class GraphqlErrorFilter implements GqlExceptionFilter {
  private readonly logger = new Logger(GraphqlErrorFilter.name)

  catch(exception: unknown, host: any) {
    if (exception instanceof SafeException) {
      // Log internal details on server side only
      this.logger.error({
        errorCode: exception.getErrorCode(),
        internalMessage: exception.getInternalMessage(),
        context: exception.getContext(),
        timestamp: new Date().toISOString(),
        stack: exception.stack,
      })

      // Return safe message to client
      return new GraphQLError(exception.message, {
        extensions: {
          statusCode: (exception as any).status,
          message: exception.message,
          errorCode: exception.getErrorCode(),
        },
      })
    }

    // For unexpected errors, log them and return generic message
    this.logger.error({
      message: "Unexpected error occurred",
      error: exception instanceof Error ? exception.message : String(exception),
      stack: exception instanceof Error ? exception.stack : undefined,
      timestamp: new Date().toISOString(),
    })

    return new GraphQLError("An unexpected error occurred. Please try again later.", {
      extensions: {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "An unexpected error occurred. Please try again later.",
        errorCode: "INTERNAL_SERVER_ERROR",
      },
    })
  }
}
