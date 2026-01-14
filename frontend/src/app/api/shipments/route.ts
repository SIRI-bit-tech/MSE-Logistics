import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'

// GET /api/shipments - Get user's shipments
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const skipParam = searchParams.get('skip')
    const takeParam = searchParams.get('take')
    
    const parsedSkip = skipParam ? parseInt(skipParam, 10) : 0
    const parsedTake = takeParam ? parseInt(takeParam, 10) : 10
    
    // Validate and clamp skip: default 0, min 0, max 10000
    const skip = Number.isFinite(parsedSkip) && parsedSkip >= 0 && parsedSkip <= 10000
      ? parsedSkip
      : 0
    
    // Validate and clamp take: default 10, min 1, max 100
    const take = Number.isFinite(parsedTake) && parsedTake >= 1 && parsedTake <= 100
      ? parsedTake
      : 10

    const shipments = await prisma.shipment.findMany({
      where: { userId },
      select: {
        id: true,
        trackingNumber: true,
        status: true,
        createdAt: true,
        recipientCity: true,
        recipientCountry: true,
        estimatedDeliveryDate: true,
        totalCost: true,
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take,
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
    const userId = await getUserFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const body = await request.json()
    
    // Generate tracking number
    const trackingNumber = `MSE${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    // Calculate costs (basic calculation - can be enhanced)
    const baseRate = body.weight * 5 // $5 per kg base rate
    const insuranceCost = body.insuranceOptional ? body.value * 0.02 : 0 // 2% of value
    const shippingCost = baseRate
    const totalCost = shippingCost + insuranceCost

    // Map form fields to DB schema explicitly
    const shipment = await prisma.shipment.create({
      data: {
        userId,
        trackingNumber,
        status: 'PENDING',
        // Sender info
        senderName: body.senderName,
        senderEmail: body.senderEmail,
        senderPhone: body.senderPhone,
        senderAddress: body.senderAddress,
        senderCity: body.senderCity,
        senderCountry: body.senderCountry,
        senderPostalCode: body.senderPostalCode,
        // Recipient info
        recipientName: body.recipientName,
        recipientEmail: body.recipientEmail,
        recipientPhone: body.recipientPhone,
        recipientAddress: body.recipientAddress,
        recipientCity: body.recipientCity,
        recipientCountry: body.recipientCountry,
        recipientPostalCode: body.recipientPostalCode,
        // Package info
        packageType: body.packageType,
        weight: body.weight,
        length: body.length,
        width: body.width,
        height: body.height,
        description: body.description,
        value: body.value,
        currency: body.currency,
        // Service info (defaults for now)
        serviceType: 'STANDARD',
        transportMode: 'WATER',
        // Costs
        shippingCost,
        insuranceCost: body.insuranceOptional ? insuranceCost : null,
        totalCost,
      },
      select: {
        id: true,
        trackingNumber: true,
        status: true,
        totalCost: true,
      }
    })

    return NextResponse.json({ shipment }, { status: 201 })
  } catch (error) {
    console.error('Error creating shipment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}