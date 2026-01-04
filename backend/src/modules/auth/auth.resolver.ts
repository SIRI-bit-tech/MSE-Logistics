import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { UserType } from "../user/user.type"
import { AuthGuard } from "../../common/guards/auth.guard"
import type { GraphQLContext } from "../../common/interfaces/graphql.context"
import { LoginInput, RegisterInput, AuthResponse } from "./auth.types"

@Resolver(() => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => UserType, { nullable: true })
  @UseGuards(AuthGuard)
  async me(@Context() context: GraphQLContext) {
    return context.user;
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput) {
    return this.authService.login(input);
  }

  @Mutation(() => AuthResponse)
  async register(@Args('input') input: RegisterInput) {
    return this.authService.register(input);
  }

  @Mutation(() => AuthResponse)
  async validateAuth0Token(@Args('accessToken') accessToken: string) {
    return this.authService.validateAuth0Token(accessToken);
  }

  @Mutation(() => AuthResponse)
  async syncAuth0User(
    @Args('auth0Id') auth0Id: string,
    @Args('email') email: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('phone', { nullable: true }) phone?: string,
    @Args('companyName', { nullable: true }) companyName?: string,
    @Args('country', { nullable: true }) country?: string
  ) {
    return this.authService.syncAuth0User(auth0Id, email, name, phone, companyName, country);
  }
}
