import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'
import { getCache, setCache } from '@/lib/redis'

// GET /api/tracking/[trackingNumber] - Get shipment by tracking number (public endpoint with limited PII)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params

    // Check if user is authenticated
    const userId = await getUserFromToken(request).catch(() => null)
    const isAuthenticated = !!userId

    // Try to get from cache first (only for public view to maximize performance)
    const cacheKey = `tracking:${trackingNumber}:${isAuthenticated ? 'auth' : 'public'}`
    const cachedData = await getCache<{ shipment: any }>(cacheKey)
    if (cachedData) {
      return NextResponse.json(cachedData)
    }

    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      cacheStrategy: { ttl: 60 }, // Built-in Prisma Accelerate caching
      select: {
        id: true,
        trackingNumber: true,
        status: true,
        estimatedDeliveryDate: true,
        actualDeliveryDate: true,

        // Sender info (full for everyone)
        senderName: true,
        senderEmail: true,
        senderPhone: true,
        senderAddress: true,
        senderCity: true,
        senderCountry: true,
        senderPostalCode: true,
        senderLatitude: true,
        senderLongitude: true,

        // Recipient info (full for everyone)
        recipientName: true,
        recipientEmail: true,
        recipientPhone: true,
        recipientAddress: true,
        recipientCity: true,
        recipientCountry: true,
        recipientPostalCode: true,
        recipientLatitude: true,
        recipientLongitude: true,

        // Package info
        packageType: true,
        weight: true,
        length: true,
        width: true,
        height: true,
        description: true,
        value: true,
        currency: true,

        // Service info
        serviceType: true,
        transportMode: true,

        // Costs (show for everyone)
        shippingCost: true,
        insuranceCost: true,
        totalCost: true,

        // Current location
        currentLatitude: true,
        currentLongitude: true,
        currentLocation: true,
        lastLocationUpdate: true,

        createdAt: true,
        updatedAt: true,

        trackingEvents: {
          select: {
            id: true,
            status: true,
            location: true,
            city: true,
            country: true,
            facility: true,
            description: true,
            transportMode: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'asc' }
        }
      }
    })

    if (!shipment) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      )
    }

    const responseData = { shipment }

    // Save to Redis cache for ultra-low latency (60 seconds)
    await setCache(cacheKey, responseData, 60)

    return NextResponse.json(responseData)
  } catch (error) {
    console.error('Error fetching shipment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
