import { GRAPHHOPPER_API_KEY } from '../../constants'

export interface GeocodingResult {
  latitude: number
  longitude: number
}

/**
 * Geocode using postal code, city, and country for more accurate results
 * @param postalCode Postal/ZIP code
 * @param city City name
 * @param country Country name
 * @returns Coordinates or null if geocoding fails
 */
export async function geocodeByPostalCode(
  postalCode: string,
  city: string,
  country: string
): Promise<GeocodingResult | null> {
  if (!GRAPHHOPPER_API_KEY) {
    console.warn('GraphHopper API key not configured')
    return null
  }

  try {
    // Use postal code as primary identifier for more accurate results
    const query = `${postalCode}, ${city}, ${country}`
    const url = `https://graphhopper.com/api/1/geocode?q=${encodeURIComponent(query)}&key=${GRAPHHOPPER_API_KEY}&limit=1`

    const response = await fetch(url)
    
    if (!response.ok) {
      console.error('Geocoding failed:', response.statusText)
      return null
    }

    const data = await response.json()

    if (data.hits && data.hits.length > 0) {
      const hit = data.hits[0]
      return {
        latitude: hit.point.lat,
        longitude: hit.point.lng,
      }
    }

    console.warn('No geocoding results found for:', query)
    return null
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

/**
 * Geocode both sender and recipient addresses using postal codes
 */
export async function geocodeShipmentAddresses(shipmentData: {
  senderPostalCode: string
  senderCity: string
  senderCountry: string
  recipientPostalCode: string
  recipientCity: string
  recipientCountry: string
}) {
  const [senderCoords, recipientCoords] = await Promise.all([
    geocodeByPostalCode(
      shipmentData.senderPostalCode,
      shipmentData.senderCity,
      shipmentData.senderCountry
    ),
    geocodeByPostalCode(
      shipmentData.recipientPostalCode,
      shipmentData.recipientCity,
      shipmentData.recipientCountry
    ),
  ])

  return {
    senderLatitude: senderCoords?.latitude ?? null,
    senderLongitude: senderCoords?.longitude ?? null,
    recipientLatitude: recipientCoords?.latitude ?? null,
    recipientLongitude: recipientCoords?.longitude ?? null,
  }
}
