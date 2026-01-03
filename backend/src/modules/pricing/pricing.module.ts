import { Module } from "@nestjs/common"
import { PricingService } from "./pricing.service"
import { ZoneService } from "./zone.service"

@Module({
  providers: [ZoneService, PricingService],
  exports: [PricingService],
})
export class PricingModule {}
