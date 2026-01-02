import { InputType, Field } from "@nestjs/graphql"
import { IsString, IsOptional, IsLatitude, IsLongitude } from "class-validator"

@InputType()
export class AddressInput {
  @Field()
  @IsString()
  street: string

  @Field()
  @IsString()
  city: string

  @Field()
  @IsString()
  state: string

  @Field()
  @IsString()
  zipCode: string

  @Field()
  @IsString()
  country: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  label?: string

  @Field()
  @IsLatitude()
  latitude: number

  @Field()
  @IsLongitude()
  longitude: number
}
