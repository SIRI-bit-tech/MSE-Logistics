import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tracking/[trackingNumber] - Public tracking endpoint
export async function GET(
  request: NextRequest,
  { params }: { params: { trackingNumber: string } }
) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: {
        trackingNumber: params.trackingNumber,
      },
      include: {
        trackingEvents: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!shipment) {
      return NextResponse.json({ error: 'Tracking number not found' }, { status: 404 })
    }

    // Return public tracking information (without sensitive data)
    const publicShipment = {
      trackingNumber: shipment.trackingNumber,
      status: shipment.status,
      senderCity: shipment.senderCity,
      senderCountry: shipment.senderCountry,
      recipientCity: shipment.recipientCity,
      recipientCountry: shipment.recipientCountry,
      serviceType: shipment.serviceType,
      transportMode: shipment.transportMode,
      estimatedDeliveryDate: shipment.estimatedDeliveryDate,
      actualDeliveryDate: shipment.actualDeliveryDate,
      createdAt: shipment.createdAt,
      trackingEvents: shipment.trackingEvents.map(event => ({
        id: event.id,
        status: event.status,
        location: event.location,
        city: event.city,
        country: event.country,
        facility: event.facility,
        description: event.description,
        transportMode: event.transportMode,
        createdAt: event.createdAt,
      })),
    }

    return NextResponse.json(publicShipment)
  } catch (error) {
    console.error('Error fetching tracking information:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}