import { ObjectType, Field, ID } from "@nestjs/graphql"
import { UserRole } from "./enums"

@ObjectType()
export class User {
  @Field(() => ID)
  id: string

  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  phoneNumber: string

  @Field(() => UserRole)
  role: UserRole

  @Field()
  isActive: boolean

  @Field({ nullable: true })
  avatar?: string

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
