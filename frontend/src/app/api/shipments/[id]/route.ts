import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/shipments/[id] - Get specific shipment
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const shipment = await prisma.shipment.findFirst({
      where: {
        id: params.id,
        userId: session.user.id, // Ensure user can only access their own shipments
      },
      include: {
        trackingEvents: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })
    }

    return NextResponse.json({ shipment })
  } catch (error) {
    console.error('Error fetching shipment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}