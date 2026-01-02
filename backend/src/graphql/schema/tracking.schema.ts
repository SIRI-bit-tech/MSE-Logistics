import { ObjectType, Field, ID } from "@nestjs/graphql"
import { ShipmentStatus } from "./enums"

@ObjectType()
export class TrackingEvent {
  @Field(() => ID)
  id: string

  @Field()
  shipmentId: string

  @Field(() => ShipmentStatus)
  status: ShipmentStatus

  @Field({ nullable: true })
  message?: string

  @Field({ nullable: true })
  facility?: string

  @Field()
  latitude: number

  @Field()
  longitude: number

  @Field()
  timestamp: Date
}
