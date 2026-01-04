import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { UserType } from "../user/user.type"
import { AuthGuard } from "../../common/guards/auth.guard"
import type { GraphQLContext } from "../../common/interfaces/graphql.context"
import { LoginInput, RegisterInput, ValidateAuth0TokenInput, SyncAuth0UserOnAuthInput, AuthResponse } from "./auth.types"
import { UserRole } from "../../graphql/schema/enums"

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

  /**
   * Synchronizes Auth0 user during initial authentication (login/registration)
   * This mutation validates the Auth0 access token to ensure caller ownership
   * 
   * @security Validates Auth0 token before syncing user data
   * @security All new users are created with CUSTOMER role by default
   */
  @Mutation(() => AuthResponse)
  async syncAuth0UserOnAuth(
    @Args('input') input: SyncAuth0UserOnAuthInput
  ) {
    return this.authService.syncAuth0UserOnAuthWithToken(
      input.accessToken,
      input.auth0Id, 
      input.email, 
      input.firstName, 
      input.lastName, 
      input.phone
    );
  }

  /**
   * Synchronizes Auth0 user data for authenticated users
   * This mutation requires authentication and validates user identity
   * Role changes are not allowed through this endpoint - requires admin approval
   */
  @Mutation(() => AuthResponse)
  @UseGuards(AuthGuard)
  async syncAuth0User(
    @Args('auth0Id') auth0Id: string,
    @Args('email') email: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Context() context: GraphQLContext,
    @Args('phone', { nullable: true }) phone?: string
  ) {
    return this.authService.syncAuth0User(
      auth0Id, 
      email, 
      firstName, 
      lastName, 
      phone, 
      context.user,
      false // Require authentication for regular sync
    );
  }
}
