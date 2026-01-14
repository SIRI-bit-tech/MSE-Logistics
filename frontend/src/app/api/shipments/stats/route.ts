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

// GET /api/shipments/stats - Get user's shipment statistics
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request)
    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get current month stats
    const now = new Date()
    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)

    // Current month stats
    const [
      activeShipments,
      delivered,
      inTransit,
      totalPackages,
      // Last month stats for comparison
      lastMonthActive,
      lastMonthDelivered,
      lastMonthInTransit,
      lastMonthTotal
    ] = await Promise.all([
      // Current month
      prisma.shipment.count({
        where: {
          userId,
          status: { in: ['PENDING', 'PROCESSING', 'PICKED_UP', 'IN_CUSTOMS', 'CUSTOMS_CLEARED', 'ARRIVED_AT_FACILITY', 'OUT_FOR_DELIVERY'] },
          createdAt: { gte: currentMonthStart }
        }
      }),
      prisma.shipment.count({
        where: {
          userId,
          status: 'DELIVERED',
          createdAt: { gte: currentMonthStart }
        }
      }),
      prisma.shipment.count({
        where: {
          userId,
          status: { in: ['IN_TRANSIT', 'OUT_FOR_DELIVERY'] },
          createdAt: { gte: currentMonthStart }
        }
      }),
      prisma.shipment.count({
        where: {
          userId,
          createdAt: { gte: currentMonthStart }
        }
      }),
      // Last month
      prisma.shipment.count({
        where: {
          userId,
          status: { in: ['PENDING', 'PROCESSING', 'PICKED_UP', 'IN_CUSTOMS', 'CUSTOMS_CLEARED', 'ARRIVED_AT_FACILITY', 'OUT_FOR_DELIVERY'] },
          createdAt: { gte: lastMonthStart, lte: lastMonthEnd }
        }
      }),
      prisma.shipment.count({
        where: {
          userId,
          status: 'DELIVERED',
          createdAt: { gte: lastMonthStart, lte: lastMonthEnd }
        }
      }),
      prisma.shipment.count({
        where: {
          userId,
          status: { in: ['IN_TRANSIT', 'OUT_FOR_DELIVERY'] },
          createdAt: { gte: lastMonthStart, lte: lastMonthEnd }
        }
      }),
      prisma.shipment.count({
        where: {
          userId,
          createdAt: { gte: lastMonthStart, lte: lastMonthEnd }
        }
      })
    ])

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? 100 : 0
      return Math.round(((current - previous) / previous) * 100)
    }

    const stats = {
      activeShipments,
      delivered,
      inTransit,
      totalPackages,
      changes: {
        activeShipments: calculateChange(activeShipments, lastMonthActive),
        delivered: calculateChange(delivered, lastMonthDelivered),
        inTransit: calculateChange(inTransit, lastMonthInTransit),
        totalPackages: calculateChange(totalPackages, lastMonthTotal)
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}