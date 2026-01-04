import { Resolver, Query, Mutation, Args, Context } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { UserType } from "../user/user.type"
import { AuthGuard } from "../../common/guards/auth.guard"
import type { GraphQLContext } from "../../common/interfaces/graphql.context"
import { LoginInput, RegisterInput, ValidateAuth0TokenInput, AuthResponse } from "./auth.types"
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
   * This mutation allows unauthenticated access for initial user creation/sync
   */
  @Mutation(() => AuthResponse)
  async syncAuth0UserOnAuth(
    @Args('auth0Id') auth0Id: string,
    @Args('email') email: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Args('phone', { nullable: true }) phone?: string,
    @Args('role', { nullable: true }) role?: UserRole
  ) {
    return this.authService.syncAuth0User(
      auth0Id, 
      email, 
      firstName, 
      lastName, 
      phone, 
      role,
      undefined, // No authenticated user for initial login/registration
      true // Allow unauthenticated access for initial sync
    );
  }

  /**
   * Synchronizes Auth0 user data for authenticated users
   * This mutation requires authentication and validates user identity
   */
  @Mutation(() => AuthResponse)
  @UseGuards(AuthGuard)
  async syncAuth0User(
    @Args('auth0Id') auth0Id: string,
    @Args('email') email: string,
    @Args('firstName') firstName: string,
    @Args('lastName') lastName: string,
    @Context() context: GraphQLContext,
    @Args('phone', { nullable: true }) phone?: string,
    @Args('role', { nullable: true }) role?: UserRole
  ) {
    return this.authService.syncAuth0User(
      auth0Id, 
      email, 
      firstName, 
      lastName, 
      phone, 
      role, 
      context.user,
      false // Require authentication for regular sync
    );
  }
}
