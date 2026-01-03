import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { StripeService } from "./stripe.service"
import { PaymentStatus } from "../../graphql/schema/enums"

@Injectable()
export class RefundService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripe: StripeService,
  ) {}

  async requestRefund(shipmentId: string, reason: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { shipmentId },
    })

    if (!payment) {
      throw new Error("Payment not found")
    }

    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new Error("Only completed payments can be refunded")
    }

    if (payment.stripePaymentIntentId) {
      await this.stripe.refundPayment(payment.stripePaymentIntentId)
    }

    return this.prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.REFUNDED,
      },
    })
  }
}
