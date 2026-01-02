import { Injectable } from "@nestjs/common"
import { TransportMode, ServiceType } from "../../graphql/schema/enums"
import type { ZoneService } from "./zone.service"

@Injectable()
export class PricingService {
  private readonly basePrice = 15
  private readonly weightMultiplier = 0.5
  private readonly distanceMultiplier = 0.01

  constructor(private readonly zoneService: ZoneService) {}

  async calculatePrice(
    weight: number,
    distance: number,
    transportMode: TransportMode,
    serviceType: ServiceType,
    senderZip: string,
    recipientZip: string,
  ): Promise<number> {
    let price = this.basePrice + weight * this.weightMultiplier + distance * this.distanceMultiplier

    // Apply transport mode multiplier
    const transportMultiplier = this.getTransportMultiplier(transportMode)
    price *= transportMultiplier

    // Apply service type multiplier
    const serviceMultiplier = this.getServiceMultiplier(serviceType)
    price *= serviceMultiplier

    // Apply zone surcharge if applicable
    const zoneSurcharge = await this.zoneService.getZoneSurcharge(senderZip, recipientZip)
    price *= 1 + zoneSurcharge

    return Math.round(price * 100) / 100
  }

  private getTransportMultiplier(mode: TransportMode): number {
    const multipliers: Record<TransportMode, number> = {
      [TransportMode.AIR]: 2.5,
      [TransportMode.LAND]: 1.0,
      [TransportMode.WATER]: 0.6,
      [TransportMode.MULTIMODAL]: 1.8,
    }
    return multipliers[mode]
  }

  private getServiceMultiplier(type: ServiceType): number {
    const multipliers: Record<ServiceType, number> = {
      [ServiceType.STANDARD]: 1.0,
      [ServiceType.EXPRESS]: 1.5,
      [ServiceType.OVERNIGHT]: 3.0,
      [ServiceType.FREIGHT]: 0.8,
    }
    return multipliers[type]
  }
}
