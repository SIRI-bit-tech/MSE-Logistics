import { Injectable } from "@nestjs/common"

interface MapboxGeocodeResponse {
  features?: Array<{
    geometry?: {
      coordinates?: [number, number]
    }
    place_name?: string
  }>
}

@Injectable()
export class GeocodingService {
  private readonly baseUrl = "https://api.mapbox.com/geocoding/v5"
  private readonly accessToken = process.env.MAPBOX_ACCESS_TOKEN

  async geocodeAddress(address: string): Promise<{ lng: number; lat: number }> {
    if (!this.accessToken) {
      throw new Error("Mapbox access token is not configured")
    }

    const encodedAddress = encodeURIComponent(address)
    const url = `${this.baseUrl}/mapbox.places/${encodedAddress}.json`
    const params = new URLSearchParams({
      access_token: this.accessToken,
    })

    try {
      const response = await fetch(`${url}?${params}`)
      const data = await response.json() as MapboxGeocodeResponse
      const [lng, lat] = data.features?.[0]?.geometry?.coordinates || [0, 0]
      return { lng, lat }
    } catch (error) {
      console.error("Geocoding error:", error)
      throw new Error("Failed to geocode address")
    }
  }

  async reverseGeocode(lng: number, lat: number): Promise<string> {
    if (!this.accessToken) {
      throw new Error("Mapbox access token is not configured")
    }

    const url = `${this.baseUrl}/mapbox.places/${lng},${lat}.json`
    const params = new URLSearchParams({
      access_token: this.accessToken,
    })

    try {
      const response = await fetch(`${url}?${params}`)
      const data = await response.json() as MapboxGeocodeResponse
      return data.features?.[0]?.place_name || "Unknown location"
    } catch (error) {
      console.error("Reverse geocoding error:", error)
      throw new Error("Failed to reverse geocode")
    }
  }
}
