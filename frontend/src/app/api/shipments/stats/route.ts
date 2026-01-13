import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/shipments/stats - Get user's shipment statistics
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Get counts for different statuses
    const [
      totalPackages,
      delivered,
      inTransit,
      activeShipments
    ] = await Promise.all([
      // Total packages
      prisma.shipment.count({
        where: { userId }
      }),
      
      // Delivered packages
      prisma.shipment.count({
        where: { 
          userId,
          status: 'DELIVERED'
        }
      }),
      
      // In transit packages
      prisma.shipment.count({
        where: { 
          userId,
          status: {
            in: ['IN_TRANSIT', 'PICKED_UP', 'OUT_FOR_DELIVERY']
          }
        }
      }),
      
      // Active shipments (not delivered, cancelled, or returned)
      prisma.shipment.count({
        where: { 
          userId,
          status: {
            notIn: ['DELIVERED', 'CANCELLED', 'RETURNED']
          }
        }
      })
    ])

    return NextResponse.json({
      totalPackages,
      delivered,
      inTransit,
      activeShipments,
    })
  } catch (error) {
    console.error('Error fetching shipment stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}