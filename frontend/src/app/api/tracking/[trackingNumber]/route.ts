import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tracking/[trackingNumber] - Get shipment by tracking number (public endpoint)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ trackingNumber: string }> }
) {
  try {
    const { trackingNumber } = await params

    const shipment = await prisma.shipment.findUnique({
      where: { trackingNumber },
      select: {
        id: true,
        trackingNumber: true,
        status: true,
        estimatedDeliveryDate: true,
        actualDeliveryDate: true,
        
        // Sender info
        senderName: true,
        senderEmail: true,
        senderPhone: true,
        senderAddress: true,
        senderCity: true,
        senderCountry: true,
        senderPostalCode: true,
        senderLatitude: true,
        senderLongitude: true,
        
        // Recipient info
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
        
        // Costs
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

    return NextResponse.json({ shipment })
  } catch (error) {
    console.error('Error fetching shipment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}