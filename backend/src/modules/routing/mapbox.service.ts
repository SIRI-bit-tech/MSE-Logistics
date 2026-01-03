import { Injectable, HttpStatus } from "@nestjs/common"
import { SafeException } from "../../common/exceptions/safe-error.exception"
import { Logger } from "@nestjs/common"

interface MapboxRouteResponse {
  routes?: Array<{
    distance?: number
    duration?: number
  }>
}

@Injectable()
export class MapboxService {
  private readonly baseUrl = "https://api.mapbox.com"
  private readonly logger = new Logger(MapboxService.name)
  private readonly accessToken = process.env.MAPBOX_ACCESS_TOKEN

  async getRoute(startLng: number, startLat: number, endLng: number, endLat: number) {
    if (!this.accessToken) {
      throw new SafeException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        userMessage: "Routing service is not properly configured.",
        internalMessage: "Mapbox access token is not configured",
        errorCode: "MAPBOX_CONFIG_ERROR",
        context: {},
      })
    }

    const url = `${this.baseUrl}/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}`
    const params = new URLSearchParams({
      access_token: this.accessToken,
      geometries: "geojson",
    })

    try {
      const response = await fetch(`${url}?${params}`)
      const data = await response.json() as MapboxRouteResponse
      return data.routes?.[0]
    } catch (error) {
      this.logger.error({
        message: "Mapbox routing error",
        error: error instanceof Error ? error.message : String(error),
        coordinates: { startLng, startLat, endLng, endLat },
      })

      throw new SafeException({
        statusCode: HttpStatus.SERVICE_UNAVAILABLE,
        userMessage: "Unable to calculate route. Please try again.",
        internalMessage: error instanceof Error ? error.message : "Mapbox API error",
        errorCode: "ROUTE_CALCULATION_FAILED",
        context: { coordinates: { startLng, startLat, endLng, endLat } },
      })
    }
  }

  async getDistance(startLng: number, startLat: number, endLng: number, endLat: number): Promise<number> {
    const route = await this.getRoute(startLng, startLat, endLng, endLat)
    return route?.distance || 0
  }

  async getDuration(startLng: number, startLat: number, endLng: number, endLat: number): Promise<number> {
    const route = await this.getRoute(startLng, startLat, endLng, endLat)
    return route?.duration || 0
  }
}
