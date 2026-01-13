import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

type ServiceType = "EXPRESS" | "STANDARD" | "ECONOMY"

interface ShippingRate {
  serviceType: ServiceType
  baseRate: number
  fuelSurcharge: number
  insurance: number
  totalCost: number
  deliveryDays: number
  description: string
}

// POST /api/shipping/calculate - Calculate shipping rates
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { weight, length, width, height, value, senderCountry, recipientCountry, insuranceOptional } = body

    // Calculate volume and dimensional weight
    const volume = (length * width * height) / 1000000 // Convert to cubic meters
    const dimensionalWeight = volume * 167 // Standard dimensional weight factor
    const chargeableWeight = Math.max(weight, dimensionalWeight)

    // Base rates per kg for different services
    const baseRates = {
      EXPRESS: 15.50,
      STANDARD: 8.75,
      ECONOMY: 5.25
    }

    // Calculate distance multiplier (simplified - in production use actual distance calculation)
    const isInternational = senderCountry !== recipientCountry
    const distanceMultiplier = isInternational ? 1.5 : 1.0

    // Calculate fuel surcharge (current rate)
    const fuelSurchargeRate = 0.125 // 12.5%

    const rates: ShippingRate[] = Object.entries(baseRates).map(([service, rate]) => {
      const baseRate = chargeableWeight * rate * distanceMultiplier
      const fuelSurcharge = baseRate * fuelSurchargeRate
      const insurance = insuranceOptional ? value * 0.005 : 0 // 0.5% of value
      const totalCost = baseRate + fuelSurcharge + insurance

      const deliveryDays = service === 'EXPRESS' ? 2 : service === 'STANDARD' ? 5 : 14

      return {
        serviceType: service as ServiceType,
        baseRate: Math.round(baseRate * 100) / 100,
        fuelSurcharge: Math.round(fuelSurcharge * 100) / 100,
        insurance: Math.round(insurance * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
        deliveryDays,
        description: `Arrives in ${deliveryDays} days`
      }
    })

    return NextResponse.json({ rates })
  } catch (error) {
    console.error('Error calculating shipping rates:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}