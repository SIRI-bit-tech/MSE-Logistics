import { Resolver, Query, Mutation } from "@nestjs/graphql"
import { UseGuards } from "@nestjs/common"
import { ShipmentService } from "./shipment.service"
import { AuthGuard } from "../../common/guards/auth.guard"
import { RolesGuard } from "../../common/guards/roles.guard"
import { Roles } from "../../common/decorators/roles.decorator"
import { ShipmentStatus } from "@prisma/client"
import { Shipment } from "../../graphql/schema/shipment.schema"

@Resolver("Shipment")
export class ShipmentResolver {
  constructor(private shipmentService: ShipmentService) {}

  @Query(() => String)
  async priceCalculator(weight: number, distance: number, serviceType: string) {
    const cost = this.shipmentService.calculateShippingCost(weight, distance, serviceType)
    return `$${cost}`
  }

  @Query(() => [Shipment])
  @UseGuards(AuthGuard)
  async myShipments(user: any, skip: number, take: number) {
    return this.shipmentService.getUserShipments(user.id, skip, take)
  }

  @Query(() => [Shipment])
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPER_ADMIN")
  async allShipments(skip: number, take: number) {
    return []
  }

  @Mutation(() => Shipment)
  @UseGuards(AuthGuard)
  async createShipment(user: any, input: any) {
    return this.shipmentService.createShipment(user.id, input)
  }

  @Mutation(() => Shipment)
  @UseGuards(AuthGuard, RolesGuard)
  @Roles("ADMIN", "SUPER_ADMIN")
  async updateShipmentStatus(id: string, status: ShipmentStatus, data: any) {
    return this.shipmentService.updateShipmentStatus(id, status, data)
  }
}
