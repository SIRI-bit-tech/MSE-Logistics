import { Resolver, Query } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { UserService } from "./user.service"
import { UserType } from "./user.type"
import { AuthGuard } from "../../common/guards/auth.guard"

@Resolver(() => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => UserType)
  @UseGuards(AuthGuard)
  async myProfile(user: any) {
    return this.userService.getUser(user.id)
  }
}
