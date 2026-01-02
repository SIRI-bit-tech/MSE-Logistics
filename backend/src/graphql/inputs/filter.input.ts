import { InputType, Field, Int } from "@nestjs/graphql"
import { IsOptional, IsString, IsNumber, Min, Max } from "class-validator"
import { ShipmentStatus, TransportMode } from "../schema/enums"

@InputType()
export class ShipmentFilterInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  trackingNumber?: string

  @Field(() => ShipmentStatus, { nullable: true })
  @IsOptional()
  status?: ShipmentStatus

  @Field(() => TransportMode, { nullable: true })
  @IsOptional()
  transportMode?: TransportMode

  @Field(() => Date, { nullable: true })
  @IsOptional()
  createdAfter?: Date

  @Field(() => Date, { nullable: true })
  @IsOptional()
  createdBefore?: Date
}

@InputType()
export class PaginationInput {
  @Field(() => Int)
  @IsNumber()
  @Min(1)
  page = 1

  @Field(() => Int)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit = 20
}
