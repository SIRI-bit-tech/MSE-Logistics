import { Injectable } from "@nestjs/common"
import type { MapboxService } from "./mapbox.service"

@Injectable()
export class RouteOptimizerService {
  constructor(private readonly mapbox: MapboxService) {}

  async optimizeRoute(
    locations: Array<{ lng: number; lat: number; id: string }>,
  ): Promise<Array<{ lng: number; lat: number; id: string }>> {
    // Simple nearest neighbor algorithm
    if (locations.length <= 1) return locations

    const optimized: Array<{ lng: number; lat: number; id: string }> = [locations[0]]
    const remaining = new Set(locations.slice(1))

    while (remaining.size > 0) {
      const current = optimized[optimized.length - 1]
      let nearest = null
      let minDistance = Number.POSITIVE_INFINITY

      for (const location of remaining) {
        const distance = this.calculateDistance(current, location)
        if (distance < minDistance) {
          minDistance = distance
          nearest = location
        }
      }

      if (nearest) {
        optimized.push(nearest)
        remaining.delete(nearest)
      }
    }

    return optimized
  }

  private calculateDistance(p1: { lng: number; lat: number }, p2: { lng: number; lat: number }): number {
    const R = 6371 // Earth radius in km
    const lat1 = (p1.lat * Math.PI) / 180
    const lat2 = (p2.lat * Math.PI) / 180
    const deltaLat = ((p2.lat - p1.lat) * Math.PI) / 180
    const deltaLng = ((p2.lng - p1.lng) * Math.PI) / 180

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }
}
