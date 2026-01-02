import { Injectable } from "@nestjs/common"
import { Stripe } from "stripe"

@Injectable()
export class StripeService {
  private stripe: Stripe

  constructor() {
    const apiKey = process.env.STRIPE_SECRET_KEY
    if (!apiKey) {
      throw new Error("STRIPE_SECRET_KEY is not set")
    }
    this.stripe = new Stripe(apiKey)
  }

  async createPaymentIntent(amount: number, currency = "usd") {
    return this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
    })
  }

  async getPaymentIntent(id: string) {
    return this.stripe.paymentIntents.retrieve(id)
  }

  async refundPayment(paymentIntentId: string) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId)

    return this.stripe.refunds.create({
      charge: paymentIntent.charges.data[0].id,
    })
  }
}
