import { Injectable, HttpStatus } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"
import type { StripeService } from "./stripe.service"
import { PaymentStatus } from "../../graphql/schema/enums"
import { SafeException } from "../../common/exceptions/safe-error.exception"

@Injectable()
export class PaymentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripe: StripeService,
  ) {}

  async createPayment(shipmentId: string, amount: number) {
    try {
      const paymentIntent = await this.stripe.createPaymentIntent(amount)

      return this.prisma.payment.create({
        data: {
          shipmentId,
          amount,
          currency: "USD",
          status: PaymentStatus.PENDING,
          stripePaymentIntentId: paymentIntent.id,
        },
      })
    } catch (error) {
      throw new SafeException({
        statusCode: HttpStatus.BAD_REQUEST,
        userMessage: "Failed to create payment. Please try again.",
        internalMessage: error instanceof Error ? error.message : "Payment creation failed",
        errorCode: "PAYMENT_CREATION_FAILED",
        context: { shipmentId, amount },
      })
    }
  }

  async confirmPayment(paymentIntentId: string) {
    try {
      const paymentIntent = await this.stripe.getPaymentIntent(paymentIntentId)

      if (paymentIntent.status === "succeeded") {
        return this.prisma.payment.update({
          where: { stripePaymentIntentId: paymentIntentId },
          data: { status: PaymentStatus.COMPLETED },
        })
      }

      throw new SafeException({
        statusCode: HttpStatus.BAD_REQUEST,
        userMessage: "Payment could not be processed. Please verify your payment details and try again.",
        internalMessage: `Payment intent status is '${paymentIntent.status}', expected 'succeeded'`,
        errorCode: "PAYMENT_NOT_SUCCESSFUL",
        context: { paymentIntentId, intentStatus: paymentIntent.status },
      })
    } catch (error) {
      if (error instanceof SafeException) {
        throw error
      }

      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Payment confirmation failed. Please try again.",
        internalMessage: error instanceof Error ? error.message : "Payment confirmation error",
        errorCode: "PAYMENT_CONFIRMATION_FAILED",
        context: { paymentIntentId },
      })
    }
  }

  async getPaymentByShipment(shipmentId: string) {
    try {
      return this.prisma.payment.findUnique({
        where: { shipmentId },
      })
    } catch (error) {
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Failed to retrieve payment information. Please try again.",
        internalMessage: error instanceof Error ? error.message : "Payment retrieval failed",
        errorCode: "PAYMENT_RETRIEVAL_FAILED",
        context: { shipmentId },
      })
    }
  }
}
