import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'

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

    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      select: {
        id: true,
        trackingNumber: true,
        status: true,
        estimatedDeliveryDate: true,
        actualDeliveryDate: true,
        
        // Sender info (limited for public, full for authenticated)
        senderName: true,
        senderEmail: isAuthenticated,
        senderPhone: isAuthenticated,
        senderAddress: true,
        senderCity: true,
        senderCountry: true,
        senderPostalCode: true,
        senderLatitude: true,
        senderLongitude: true,
        
        // Recipient info (limited for public, full for authenticated)
        recipientName: true,
        recipientEmail: isAuthenticated,
        recipientPhone: isAuthenticated,
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
        value: isAuthenticated, // Hide value from public
        currency: true,
        
        // Service info
        serviceType: true,
        transportMode: true,
        
        // Costs (hide from public)
        shippingCost: isAuthenticated,
        insuranceCost: isAuthenticated,
        totalCost: isAuthenticated,
        
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

    return NextResponse.json({ shipment })
  } catch (error) {
    console.error('Error fetching shipment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}