import { Injectable } from "@nestjs/common"
import type { MapboxConfig } from "../../config/mapbox.config"

@Injectable()
export class GeocodingService {
  private readonly baseUrl = "https://api.mapbox.com/geocoding/v5"

  constructor(private readonly config: MapboxConfig) {}

  async geocodeAddress(address: string): Promise<{ lng: number; lat: number }> {
    const encodedAddress = encodeURIComponent(address)
    const url = `${this.baseUrl}/mapbox.places/${encodedAddress}.json`
    const params = new URLSearchParams({
      access_token: this.config.accessToken,
    })

    try {
      const response = await fetch(`${url}?${params}`)
      const data = await response.json()
      const [lng, lat] = data.features?.[0]?.geometry?.coordinates || [0, 0]
      return { lng, lat }
    } catch (error) {
      console.error("Geocoding error:", error)
      throw new Error("Failed to geocode address")
    }
  }

  async reverseGeocode(lng: number, lat: number): Promise<string> {
    const url = `${this.baseUrl}/mapbox.places/${lng},${lat}.json`
    const params = new URLSearchParams({
      access_token: this.config.accessToken,
    })

    try {
      const response = await fetch(`${url}?${params}`)
      const data = await response.json()
      return data.features?.[0]?.place_name || "Unknown location"
    } catch (error) {
      console.error("Reverse geocoding error:", error)
      throw new Error("Failed to reverse geocode")
    }
  }
}
