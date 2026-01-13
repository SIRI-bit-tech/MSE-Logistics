import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/admin/shipments - Get all shipments (admin only)
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin (you'll need to implement role checking)
    // For now, assuming all authenticated users can access admin routes
    // You should add proper role validation here

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    const skip = (page - 1) * limit

    const where: any = {}
    
    if (status) {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { trackingNumber: { contains: search, mode: 'insensitive' } },
        { senderName: { contains: search, mode: 'insensitive' } },
        { recipientName: { contains: search, mode: 'insensitive' } },
        { senderEmail: { contains: search, mode: 'insensitive' } },
        { recipientEmail: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [shipments, total] = await Promise.all([
      prisma.shipment.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            }
          },
          trackingEvents: {
            orderBy: { createdAt: 'desc' },
            take: 3,
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.shipment.count({ where }),
    ])

    return NextResponse.json({
      shipments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching admin shipments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}