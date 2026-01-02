import { type ArgumentsHost, Catch, type ExceptionFilter, HttpStatus, Logger } from "@nestjs/common"
import type { Response } from "express"
import { SafeException } from "../exceptions/safe-error.exception"

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    if (exception instanceof SafeException) {
      // Log detailed error server-side
      this.logger.error({
        errorCode: exception.getErrorCode(),
        internalMessage: exception.getInternalMessage(),
        context: exception.getContext(),
        timestamp: new Date().toISOString(),
        stack: exception.stack,
      })

      // Send safe response to client
      return response.status((exception as any).status).json({
        statusCode: (exception as any).status,
        message: exception.message,
        errorCode: exception.getErrorCode(),
        timestamp: new Date().toISOString(),
      })
    }

    // For unexpected errors
    const statusCode = exception instanceof Error ? HttpStatus.INTERNAL_SERVER_ERROR : HttpStatus.INTERNAL_SERVER_ERROR

    this.logger.error({
      message: "Unhandled exception",
      error: exception instanceof Error ? exception.message : String(exception),
      stack: exception instanceof Error ? exception.stack : undefined,
      timestamp: new Date().toISOString(),
    })

    response.status(statusCode).json({
      statusCode,
      message: "An unexpected error occurred. Please try again later.",
      errorCode: "INTERNAL_SERVER_ERROR",
      timestamp: new Date().toISOString(),
    })
  }
}
