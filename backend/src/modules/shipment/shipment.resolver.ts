import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { ShipmentService } from "./shipment.service"
import { AuthGuard } from "../../common/guards/auth.guard"
import { RolesGuard } from "../../common/guards/roles.guard"
import { Roles } from "../../common/decorators/roles.decorator"
import { CurrentUser } from "../../common/decorators/current-user.decorator"
import { ShipmentStatus } from "@prisma/client"
import { Shipment } from "../../graphql/schema/shipment.schema"

@Resolver("Shipment")
export class ShipmentResolver {
  constructor(private shipmentService: ShipmentService) {}

  @Query(() => String)
  async priceCalculator(
    @Args('weight') weight: number,
    @Args('distance') distance: number,
    @Args('serviceType') serviceType: string
  ) {
    const cost = this.shipmentService.calculateShippingCost(weight, distance, serviceType)
    return `$${cost}`
  }

  @Query(() => [Shipment])
  @UseGuards(AuthGuard)
  async myShipments(
    @CurrentUser() user: any,
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('take', { type: () => Int, defaultValue: 10 }) take: number
  ) {
    return this.shipmentService.getUserShipments(user.id, skip, take)
  }

  @Query(() => [Shipment])
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPER_ADMIN")
  async allShipments(
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
    @Args('take', { type: () => Int, defaultValue: 10 }) take: number
  ) {
    return await this.shipmentService.getAllShipments(skip, take)
  }

  @Mutation(() => Shipment)
  @UseGuards(AuthGuard)
  async createShipment(@CurrentUser() user: any, @Args('input') input: any) {
    return this.shipmentService.createShipment(user.id, input)
  }

  @Mutation(() => Shipment)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPER_ADMIN")
  async updateShipmentStatus(
    @Args('input') input: { id: string; status: ShipmentStatus; data?: any }
  ) {
    return this.shipmentService.updateShipmentStatus(input.id, input.status, input.data)
  }
}
