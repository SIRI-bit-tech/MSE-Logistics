import { HttpException, type HttpStatus } from "@nestjs/common"

export interface SafeErrorOptions {
  statusCode: HttpStatus
  userMessage: string
  internalMessage: string
  errorCode: string
  context?: Record<string, any>
}

export class SafeException extends HttpException {
  private readonly safeOptions: SafeErrorOptions

  constructor(options: SafeErrorOptions) {
    // Only send userMessage to client, never internal details
    super(
      {
        statusCode: options.statusCode,
        message: options.userMessage,
        errorCode: options.errorCode,
      },
      options.statusCode,
    )
    this.safeOptions = options
  }

  getInternalMessage(): string {
    return this.safeOptions.internalMessage
  }

  getContext(): Record<string, any> | undefined {
    return this.safeOptions.context
  }

  getErrorCode(): string {
    return this.safeOptions.errorCode
  }
}
