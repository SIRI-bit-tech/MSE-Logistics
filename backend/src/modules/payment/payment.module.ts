import { Module } from "@nestjs/common"
import { PrismaModule } from "../prisma/prisma.module"
import { PaymentService } from "./payment.service"
import { StripeService } from "./stripe.service"
import { RefundService } from "./refund.service"

@Module({
  imports: [PrismaModule],
  providers: [PaymentService, StripeService, RefundService],
  exports: [PaymentService, StripeService, RefundService],
})
export class PaymentModule {}
