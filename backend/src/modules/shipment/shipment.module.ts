import { Module } from "@nestjs/common"
import { ShipmentService } from "./shipment.service"
import { ShipmentResolver } from "./shipment.resolver"
import { PrismaModule } from "../prisma/prisma.module"
import { GeoModule } from "../geo/geo.module"

@Module({
  imports: [PrismaModule, GeoModule],
  providers: [ShipmentService, ShipmentResolver],
  exports: [ShipmentService],
})
export class ShipmentModule {}
