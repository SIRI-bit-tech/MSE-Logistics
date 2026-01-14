import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'

// GET /api/admin/shipments - Get all shipments (admin only)
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const pageParam = searchParams.get('page')
    const limitParam = searchParams.get('limit')
    const status = searchParams.get('status')
    const search = searchParams.get('search')
    
    const parsedPage = pageParam ? parseInt(pageParam, 10) : 1
    const parsedLimit = limitParam ? parseInt(limitParam, 10) : 20
    
    // Validate and clamp page: default 1, min 1, max 10000
    const page = Number.isFinite(parsedPage) && parsedPage >= 1 && parsedPage <= 10000
      ? parsedPage
      : 1
    
    // Validate and clamp limit: default 20, min 1, max 100
    const limit = Number.isFinite(parsedLimit) && parsedLimit >= 1 && parsedLimit <= 100
      ? parsedLimit
      : 20
    
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