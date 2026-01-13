import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

type PackageType = "DOCUMENTS" | "PARCEL" | "FRAGILE" | "ELECTRONICS" | "CLOTHING" | "FOOD" | "HAZARDOUS" | "OTHER"
type ServiceType = "EXPRESS" | "STANDARD" | "ECONOMY"

interface ShipmentFormData {
  senderName: string
  senderEmail: string
  senderPhone: string
  senderAddress: string
  senderCity: string
  senderCountry: string
  senderPostalCode: string
  recipientName: string
  recipientEmail: string
  recipientPhone: string
  recipientAddress: string
  recipientCity: string
  recipientCountry: string
  recipientPostalCode: string
  packageType: PackageType
  weight: number
  length: number
  width: number
  height: number
  description: string
  value: number
  currency: string
  serviceType: ServiceType
  insuranceOptional: boolean
}

// GET /api/shipments - Get user's shipments
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const shipments = await prisma.shipment.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        trackingEvents: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ shipments })
  } catch (error) {
    console.error('Error fetching shipments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/shipments - Create new shipment
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: ShipmentFormData & {
      shippingCost: number
      insuranceCost: number
      totalCost: number
    } = await request.json()

    // Generate tracking number
    const trackingNumber = `MSE${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    // Create shipment
    const shipment = await prisma.shipment.create({
      data: {
        trackingNumber,
        userId: session.user.id,

        // Sender information
        senderName: body.senderName,
        senderEmail: body.senderEmail,
        senderPhone: body.senderPhone,
        senderAddress: body.senderAddress,
        senderCity: body.senderCity,
        senderCountry: body.senderCountry,
        senderPostalCode: body.senderPostalCode,
        senderLatitude: 0, // TODO: Geocode address
        senderLongitude: 0,

        // Recipient information
        recipientName: body.recipientName,
        recipientEmail: body.recipientEmail,
        recipientPhone: body.recipientPhone,
        recipientAddress: body.recipientAddress,
        recipientCity: body.recipientCity,
        recipientCountry: body.recipientCountry,
        recipientPostalCode: body.recipientPostalCode,
        recipientLatitude: 0, // TODO: Geocode address
        recipientLongitude: 0,

        // Package details
        packageType: body.packageType,
        weight: body.weight,
        length: body.length,
        width: body.width,
        height: body.height,
        description: body.description,
        value: body.value,
        currency: body.currency,

        // Service details
        serviceType: body.serviceType,
        transportMode: 'MULTIMODAL', // Default to multimodal
        status: 'PENDING',

        // Costs
        shippingCost: body.shippingCost,
        insuranceCost: body.insuranceCost || 0,
        totalCost: body.totalCost,

        // Customs
        customsDocuments: [],
      },
      include: {
        trackingEvents: true
      }
    })

    // Create initial tracking event
    await prisma.trackingEvent.create({
      data: {
        shipmentId: shipment.id,
        status: 'PENDING',
        location: body.senderCity,
        city: body.senderCity,
        country: body.senderCountry,
        description: 'Shipment created and pending pickup',
        updatedBy: session.user.id,
      }
    })

    return NextResponse.json({ shipment })
  } catch (error) {
    console.error('Error creating shipment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}