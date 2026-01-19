// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getUserFromToken } from '@/lib/jwt-config'
import { z } from 'zod'
import { geocodeShipmentAddresses } from '@/lib/geocoding'
import crypto from 'crypto'

// Generate cryptographically secure tracking number (MSE-ABC123 format)
function generateTrackingNumber(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  
  // Use crypto for secure random generation with stronger entropy
  const randomBytes = crypto.randomBytes(8) // Increased from 6 to 8 for more entropy
  
  let code = 'MSE-'
  // Generate 3 random letters
  for (let i = 0; i < 3; i++) {
    code += letters[randomBytes[i] % 26]
  }
  // Generate 3 random numbers
  for (let i = 3; i < 6; i++) {
    code += numbers[randomBytes[i] % 10]
  }
  
  // Add 2 more random characters for extra uniqueness (reduces collision probability)
  code += letters[randomBytes[6] % 26]
  code += numbers[randomBytes[7] % 10]
  
  return code
}

// Create shipment with retry on unique constraint violation
async function createShipmentWithRetry(
  shipmentData: any,
  maxRetries: number = 5
): Promise<any> {
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // Generate new tracking number for each attempt
      const trackingNumber = generateTrackingNumber()
      
      // Attempt to create shipment
      const shipment = await prisma.shipment.create({
        data: {
          ...shipmentData,
          trackingNumber,
        },
        select: {
          id: true,
          trackingNumber: true,
          status: true,
          totalCost: true,
        }
      })
      
      return shipment
    } catch (error: any) {
      // Check if it's a Prisma unique constraint violation
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        // Normalize target to array for consistent checking
        const target = Array.isArray(error.meta?.target) 
          ? error.meta.target 
          : [error.meta?.target]
        
        // Check if the collision is on trackingNumber field
        if (target.includes('trackingNumber')) {
          // Collision detected, retry with new tracking number
          console.warn(`Tracking number collision on attempt ${attempt + 1}, retrying...`)
          continue
        }
      }
      
      // If it's a different error, throw immediately
      throw error
    }
  }
  
  // Max retries exceeded
  throw new Error(
    `Failed to generate unique tracking number after ${maxRetries} attempts. ` +
    `This is extremely rare and may indicate a system issue.`
  )
}

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
          details: validationResult.error.issues.map((err) => `${err.path.join('.')}: ${err.message}`)
        },
        { status: 400 }
      )
    }

    const data = validationResult.data

    // Geocode addresses using postal codes to get coordinates
    let coordinates
    try {
      coordinates = await geocodeShipmentAddresses({
        senderPostalCode: data.senderPostalCode,
        senderCity: data.senderCity,
        senderCountry: data.senderCountry,
        recipientPostalCode: data.recipientPostalCode,
        recipientCity: data.recipientCity,
        recipientCountry: data.recipientCountry,
      })
    } catch (geocodingError) {
      console.error('Geocoding failed:', geocodingError)
      // Use default coordinates if geocoding fails
      coordinates = {
        senderLatitude: null,
        senderLongitude: null,
        recipientLatitude: null,
        recipientLongitude: null,
      }
    }

    // Calculate costs using validated data (basic calculation - can be enhanced)
    const baseRate = data.weight * 5 // $5 per kg base rate
    const insuranceCost = data.insuranceOptional ? data.value * 0.02 : 0 // 2% of value
    const shippingCost = baseRate
    const totalCost = shippingCost + insuranceCost

    // Prepare shipment data (without tracking number - will be generated in retry loop)
    const shipmentData = {
      userId,
      status: 'PENDING',
      // Sender info
      senderName: data.senderName,
      senderEmail: data.senderEmail,
      senderPhone: data.senderPhone,
      senderAddress: data.senderAddress,
      senderCity: data.senderCity,
      senderCountry: data.senderCountry,
      senderPostalCode: data.senderPostalCode,
      senderLatitude: coordinates.senderLatitude,
      senderLongitude: coordinates.senderLongitude,
      // Recipient info
      recipientName: data.recipientName,
      recipientEmail: data.recipientEmail,
      recipientPhone: data.recipientPhone,
      recipientAddress: data.recipientAddress,
      recipientCity: data.recipientCity,
      recipientCountry: data.recipientCountry,
      recipientPostalCode: data.recipientPostalCode,
      recipientLatitude: coordinates.recipientLatitude,
      recipientLongitude: coordinates.recipientLongitude,
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
      transportMode: 'LAND',
      // Costs
      shippingCost,
      insuranceCost: data.insuranceOptional ? insuranceCost : null,
      totalCost,
      // Current location (initially at sender location)
      currentLatitude: coordinates.senderLatitude,
      currentLongitude: coordinates.senderLongitude,
      currentLocation: `${data.senderCity}, ${data.senderCountry}`,
      lastLocationUpdate: new Date(),
    }

    // Create shipment with automatic retry on tracking number collision
    const shipment = await createShipmentWithRetry(shipmentData)

    return NextResponse.json({ shipment }, { status: 201 })
  } catch (error) {
    console.error('Error creating shipment:', error)
    
    // Provide more specific error message if it's a tracking number generation failure
    if (error instanceof Error && error.message.includes('unique tracking number')) {
      return NextResponse.json(
        { error: 'Unable to generate tracking number. Please try again.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}