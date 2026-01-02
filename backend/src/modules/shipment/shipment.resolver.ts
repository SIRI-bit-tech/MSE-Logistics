import { Resolver, Query, Mutation } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import type { ShipmentService } from "./shipment.service"
import { AuthGuard } from "../../common/guards/auth.guard"
import { RolesGuard } from "../../common/guards/roles.guard"
import { Roles } from "../../common/decorators/roles.decorator"

@Resolver("Shipment")
export class ShipmentResolver {
  constructor(private shipmentService: ShipmentService) {}

  @Query(() => String)
  async priceCalculator(weight: number, distance: number, serviceType: string) {
    const cost = this.shipmentService.calculateShippingCost(weight, distance, serviceType)
    return `$${cost}`
  }

  @Query()
  @UseGuards(AuthGuard)
  async myShipments(user: any, skip: number, take: number) {
    return this.shipmentService.getUserShipments(user.id, skip, take)
  }

  @Query()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPER_ADMIN")
  async allShipments(skip: number, take: number) {
    return []
  }

  @Mutation()
  @UseGuards(AuthGuard)
  async createShipment(user: any, input: any) {
    return this.shipmentService.createShipment(user.id, input)
  }

  @Mutation()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPER_ADMIN")
  async updateShipmentStatus(id: string, status: string, data: any) {
    return this.shipmentService.updateShipmentStatus(id, status, data)
  }
}
