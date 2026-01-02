import { Resolver, Query, Context } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import type { AuthService } from "./auth.service"
import { UserType } from "../user/user.type"
import { AuthGuard } from "../../common/guards/auth.guard"
import type { GraphQLContext } from "../../common/interfaces/graphql.context"

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => UserType, { nullable: true })
  @UseGuards(AuthGuard)
  async me(@Context() context: GraphQLContext) {
    return context.user;
  }
}
