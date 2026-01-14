import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'
import { z } from 'zod'

// Shipment creation validation schema
const shipmentSchema = z.object({
  // Sender info
  senderName: z.string().min(1, 'Sender name is required'),
  senderEmail: z.email({ message: 'Invalid sender email' }),
  senderPhone: z.string().min(1, 'Sender phone is required'),
  senderAddress: z.string().min(1, 'Sender address is required'),
  senderCity: z.string().min(1, 'Sender city is required'),
  senderCountry: z.string().min(1, 'Sender country is required'),
  senderPostalCode: z.string().min(1, 'Sender postal code is required'),
  // Recipient info
  recipientName: z.string().min(1, 'Recipient name is required'),
  recipientEmail: z.email({ message: 'Invalid recipient email' }),
  recipientPhone: z.string().min(1, 'Recipient phone is required'),
  recipientAddress: z.string().min(1, 'Recipient address is required'),
  recipientCity: z.string().min(1, 'Recipient city is required'),
  recipientCountry: z.string().min(1, 'Recipient country is required'),
  recipientPostalCode: z.string().min(1, 'Recipient postal code is required'),
  // Package info
  packageType: z.enum(['DOCUMENTS', 'PARCEL', 'FRAGILE', 'ELECTRONICS', 'CLOTHING', 'FOOD', 'HAZARDOUS', 'OTHER'], {
    message: 'Invalid package type'
  }),
  weight: z.number().nonnegative('Weight must be non-negative'),
  length: z.number().nonnegative('Length must be non-negative'),
  width: z.number().nonnegative('Width must be non-negative'),
  height: z.number().nonnegative('Height must be non-negative'),
  description: z.string().min(1, 'Description is required'),
  value: z.number().nonnegative('Value must be non-negative'),
  currency: z.string().min(1, 'Currency is required'),
  insuranceOptional: z.boolean(),
})

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
    
    // Validate input
    const validationResult = shipmentSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.issues.map((err) => err.message)
        },
        { status: 400 }
      )
    }

    const data = validationResult.data
    
    // Generate tracking number
    const trackingNumber = `MSE${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`

    // Calculate costs using validated data (basic calculation - can be enhanced)
    const baseRate = data.weight * 5 // $5 per kg base rate
    const insuranceCost = data.insuranceOptional ? data.value * 0.02 : 0 // 2% of value
    const shippingCost = baseRate
    const totalCost = shippingCost + insuranceCost

    // Map form fields to DB schema explicitly
    const shipment = await prisma.shipment.create({
      data: {
        userId,
        trackingNumber,
        status: 'PENDING',
        // Sender info
        senderName: data.senderName,
        senderEmail: data.senderEmail,
        senderPhone: data.senderPhone,
        senderAddress: data.senderAddress,
        senderCity: data.senderCity,
        senderCountry: data.senderCountry,
        senderPostalCode: data.senderPostalCode,
        // Recipient info
        recipientName: data.recipientName,
        recipientEmail: data.recipientEmail,
        recipientPhone: data.recipientPhone,
        recipientAddress: data.recipientAddress,
        recipientCity: data.recipientCity,
        recipientCountry: data.recipientCountry,
        recipientPostalCode: data.recipientPostalCode,
        // Package info
        packageType: data.packageType,
        weight: data.weight,
        length: data.length,
        width: data.width,
        height: data.height,
        description: data.description,
        value: data.value,
        currency: data.currency,
        // Service info (defaults for now)
        serviceType: 'STANDARD',
        transportMode: 'WATER',
        // Costs
        shippingCost,
        insuranceCost: data.insuranceOptional ? insuranceCost : null,
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