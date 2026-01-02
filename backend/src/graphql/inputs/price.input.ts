import { InputType, Field } from "@nestjs/graphql"
import { IsNumber, IsString } from "class-validator"
import { TransportMode, ServiceType } from "../schema/enums"

@InputType()
export class PriceCalculatorInput {
  @Field()
  @IsNumber()
  weight: number

  @Field()
  @IsNumber()
  distance: number

  @Field()
  @IsString()
  senderZipCode: string

  @Field()
  @IsString()
  recipientZipCode: string

  @Field(() => TransportMode)
  transportMode: TransportMode

  @Field(() => ServiceType)
  serviceType: ServiceType
}
