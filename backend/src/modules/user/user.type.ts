import { ObjectType, Field, ID } from "@nestjs/graphql"
import { UserRole } from "@prisma/client"

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string

  @Field()
  email: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field({ nullable: true })
  phoneNumber?: string

  @Field({ nullable: true })
  avatar?: string

  @Field(() => UserRole)
  role: UserRole

  @Field()
  isActive: boolean

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
