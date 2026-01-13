import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

async function getUserFromToken(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.userId as string
  } catch {
    return null
  }
}

// GET /api/activities - Get user's recent activities
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')

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