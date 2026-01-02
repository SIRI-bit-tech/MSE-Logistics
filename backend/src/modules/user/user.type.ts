import { ObjectType, Field, ID } from "@nestjs/graphql"

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
  phone?: string

  @Field({ nullable: true })
  profileImage?: string

  @Field()
  role: string

  @Field()
  createdAt: Date
}
