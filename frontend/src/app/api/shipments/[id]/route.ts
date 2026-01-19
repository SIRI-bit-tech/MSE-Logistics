// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'

// GET /api/shipments/[id] - Get specific shipment details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = await getUserFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { id: shipmentId } = await params

    const shipment = await prisma.shipment.findFirst({
      where: { 
        id: shipmentId,
        userId // Ensure user can only access their own shipments
      },
      select: {
        id: true,
        trackingNumber: true,
        status: true,
        createdAt: true,
        estimatedDeliveryDate: true,
        totalCost: true,
        // Sender info
        senderName: true,
        senderEmail: true,
        senderPhone: true,
        senderAddress: true,
        senderCity: true,
        senderCountry: true,
        senderPostalCode: true,
        // Recipient info
        recipientName: true,
        recipientEmail: true,
        recipientPhone: true,
        recipientAddress: true,
        recipientCity: true,
        recipientCountry: true,
        recipientPostalCode: true,
        // Package info
        packageType: true,
        weight: true,
        length: true,
        width: true,
        height: true,
        description: true,
        value: true,
        currency: true,
        serviceType: true,
        transportMode: true,
        // Additional info
        shippingCost: true,
        insuranceCost: true,
      }
    })

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })
    }

    return NextResponse.json({ shipment })
  } catch (error) {
    console.error('Error fetching shipment details:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}