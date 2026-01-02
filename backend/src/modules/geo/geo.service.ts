import { Injectable } from "@nestjs/common"

@Injectable()
export class GeoService {
  // Haversine formula to calculate distance between two coordinates
  async calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): Promise<number> {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  async geocodeAddress(address: string): Promise<{ lat: number; lon: number }> {
    // Integrate with Mapbox Geocoding API in production
    // For now, return a default response
    return { lat: 0, lon: 0 }
  }

  async getReverseGeocoding(latitude: number, longitude: number): Promise<string> {
    // Integrate with Mapbox Reverse Geocoding API in production
    return `${latitude}, ${longitude}`
  }
}
