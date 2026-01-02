import { InputType, Field } from "@nestjs/graphql"
import { IsString, IsNumber, IsOptional, IsEmail } from "class-validator"
import { TransportMode, ServiceType } from "../schema/enums"

@InputType()
export class CreateShipmentInput {
  @Field()
  @IsString()
  senderName: string

  @Field()
  @IsEmail()
  senderEmail: string

  @Field()
  @IsString()
  recipientName: string

  @Field()
  @IsEmail()
  recipientEmail: string

  @Field()
  @IsString()
  recipientPhone: string

  @Field()
  @IsString()
  senderAddressId: string

  @Field()
  @IsString()
  recipientAddressId: string

  @Field()
  @IsNumber()
  weight: number

  @Field()
  @IsString()
  dimensions: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contents?: string

  @Field(() => TransportMode)
  transportMode: TransportMode

  @Field(() => ServiceType)
  serviceType: ServiceType
}

@InputType()
export class UpdateShipmentInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  senderName?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  recipientName?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  recipientPhone?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  contents?: string
}
