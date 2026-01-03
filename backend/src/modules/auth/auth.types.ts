import { ObjectType, Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsString, MinLength, IsOptional } from "class-validator"
import { UserType } from "../user/user.type"

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  @MinLength(6)
  password: string
}

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  fullName: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  companyName?: string

  @Field()
  @IsEmail()
  businessEmail: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  country?: string

  @Field()
  @IsString()
  @MinLength(6)
  password: string
}

@ObjectType()
export class AuthResponse {
  @Field()
  token: string

  @Field(() => UserType)
  user: UserType
}