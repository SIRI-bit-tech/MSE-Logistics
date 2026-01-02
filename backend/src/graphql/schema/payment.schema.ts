import { ObjectType, Field, ID } from "@nestjs/graphql"
import { PaymentStatus } from "./enums"

@ObjectType()
export class Payment {
  @Field(() => ID)
  id: string

  @Field()
  shipmentId: string

  @Field()
  amount: number

  @Field()
  currency: string

  @Field(() => PaymentStatus)
  status: PaymentStatus

  @Field({ nullable: true })
  stripePaymentIntentId?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
