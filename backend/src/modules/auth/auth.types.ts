import { ObjectType, Field, InputType } from "@nestjs/graphql"
import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from "class-validator"
import { UserType } from "../user/user.type"
import { UserRole } from "../../graphql/schema/enums"

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

@InputType()
export class ValidateAuth0TokenInput {
  @Field()
  @IsString()
  accessToken: string
}

@InputType()
export class SyncAuth0UserInput {
  @Field()
  @IsString()
  auth0Id: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @IsString()
  firstName: string

  @Field()
  @IsString()
  lastName: string

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phone?: string

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole
}

@ObjectType()
export class AuthResponse {
  @Field()
  token: string

  @Field(() => UserType)
  user: UserType
}