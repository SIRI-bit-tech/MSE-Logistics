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

    const shipment = await prisma.shipment.create({
      data: {
        ...body,
        userId,
        trackingNumber,
        status: 'PENDING',
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