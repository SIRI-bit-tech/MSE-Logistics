import { ObjectType, Field, ID } from "@nestjs/graphql"

@ObjectType()
export class Address {
  @Field(() => ID)
  id: string

  @Field()
  street: string

  @Field()
  city: string

  @Field()
  state: string

  @Field()
  zipCode: string

  @Field()
  country: string

  @Field({ nullable: true })
  label?: string

  @Field()
  latitude: number

  @Field()
  longitude: number

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
