import { HttpException, type HttpStatus } from "@nestjs/common"

export interface SafeErrorOptions {
  statusCode: HttpStatus
  userMessage: string
  internalMessage: string
  errorCode: string
  context?: Record<string, any>
}

export class SafeException extends HttpException {
  constructor(private readonly options: SafeErrorOptions) {
    // Only send userMessage to client, never internal details
    super(
      {
        statusCode: options.statusCode,
        message: options.userMessage,
        errorCode: options.errorCode,
      },
      options.statusCode,
    )
  }

  getInternalMessage(): string {
    return this.options.internalMessage
  }

  getContext(): Record<string, any> | undefined {
    return this.options.context
  }

  getErrorCode(): string {
    return this.options.errorCode
  }
}
