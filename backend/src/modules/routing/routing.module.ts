import { Module } from "@nestjs/common"
import { MapboxService } from "./mapbox.service"
import { GeocodingService } from "./geocoding.service"
import { RouteOptimizerService } from "./route-optimizer.service"

@Module({
  providers: [MapboxService, GeocodingService, RouteOptimizerService],
  exports: [MapboxService, GeocodingService, RouteOptimizerService],
})
export class RoutingModule {}
