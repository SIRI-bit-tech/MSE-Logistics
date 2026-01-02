import { ObjectType, Field, ID } from "@nestjs/graphql"
import { ShipmentStatus, TransportMode, ServiceType } from "./enums"
import { User } from "./user.schema"
import { Address } from "./address.schema"

@ObjectType()
export class Shipment {
  @Field(() => ID)
  id: string

  @Field()
  trackingNumber: string

  @Field(() => ShipmentStatus)
  status: ShipmentStatus

  @Field(() => TransportMode)
  transportMode: TransportMode

  @Field(() => ServiceType)
  serviceType: ServiceType

  @Field()
  senderName: string

  @Field()
  senderEmail: string

  @Field()
  recipientName: string

  @Field()
  recipientEmail: string

  @Field()
  recipientPhone: string

  @Field()
  weight: number

  @Field()
  dimensions: string

  @Field({ nullable: true })
  contents?: string

  @Field(() => Address)
  senderAddress: Address

  @Field(() => Address)
  recipientAddress: Address

  @Field()
  estimatedDelivery: Date

  @Field({ nullable: true })
  actualDelivery?: Date

  @Field()
  price: number

  @Field(() => User)
  customer: User

  @Field(() => User, { nullable: true })
  driver?: User

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
