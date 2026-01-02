import { Module } from "@nestjs/common"
import { PricingService } from "./pricing.service"
import { ZoneService } from "./zone.service"

@Module({
  providers: [PricingService, ZoneService],
  exports: [PricingService, ZoneService],
})
export class PricingModule {}
