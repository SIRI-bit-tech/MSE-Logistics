import { Module } from "@nestjs/common"
import { ShipmentService } from "./shipment.service"
import { ShipmentResolver } from "./shipment.resolver"
import { PrismaModule } from "../prisma/prisma.module"
import { GeoModule } from "../geo/geo.module"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [PrismaModule, GeoModule, AuthModule],
  providers: [ShipmentService, ShipmentResolver],
  exports: [ShipmentService],
})
export class ShipmentModule {}
