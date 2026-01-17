import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'
import { shouldSkipDatabaseOperations, buildTimeResponse } from '@/lib/build-utils'

// GET /api/activities - Get user's recent activities
export async function GET(request: NextRequest) {
  // Skip database operations during build
  if (shouldSkipDatabaseOperations()) {
    return buildTimeResponse('Activities not available during build')
  }

  try {
    const userId = await getUserFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limitParam = searchParams.get('limit')
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : 5
    
    // Validate and clamp limit: default 5, min 1, max 100
    const limit = Number.isFinite(parsedLimit) && parsedLimit >= 1 && parsedLimit <= 100
      ? parsedLimit
      : 5

    // Get recent shipments as activities
    const recentShipments = await prisma.shipment.findMany({
      where: { userId },
      select: {
        id: true,
        trackingNumber: true,
        status: true,
        createdAt: true,
        recipientCity: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    })

    // Format as activities
    const activities = recentShipments.map(shipment => ({
      id: shipment.id,
      type: 'shipment_created',
      title: `Shipment ${shipment.trackingNumber} to ${shipment.recipientCity}`,
      time: shipment.createdAt.toISOString(),
      actionText: 'Track',
      actionHref: `/tracking/${shipment.trackingNumber}`
    }))

    return NextResponse.json({ activities })
  } catch (error) {
    console.error('Error fetching activities:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}