import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { UserType } from "../user/user.type"
import { AuthGuard } from "../../common/guards/auth.guard"
import type { GraphQLContext } from "../../common/interfaces/graphql.context"
import { LoginInput, RegisterInput, ValidateAuth0TokenInput, SyncAuth0UserInput, AuthResponse } from "./auth.types"

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
  async validateAuth0Token(@Args('input') input: ValidateAuth0TokenInput) {
    return this.authService.validateAuth0Token(input.accessToken);
  }

  @Mutation(() => AuthResponse)
  @UseGuards(AuthGuard)
  async syncAuth0User(
    @Args('input') input: SyncAuth0UserInput,
    @Context() context: GraphQLContext
  ) {
    return this.authService.syncAuth0User(
      input.auth0Id, 
      input.email, 
      input.firstName, 
      input.lastName, 
      input.phone, 
      input.role, 
      context.user
    );
  }
}
