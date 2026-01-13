import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/tracking/[trackingNumber] - Get shipment by tracking number (public endpoint)
export async function GET(
  request: NextRequest,
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
        senderCity: true,
        senderCountry: true,
        recipientCity: true,
        recipientCountry: true,
        createdAt: true,
        trackingEvents: {
          select: {
            id: true,
            status: true,
            location: true,
            city: true,
            country: true,
            description: true,
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' }
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