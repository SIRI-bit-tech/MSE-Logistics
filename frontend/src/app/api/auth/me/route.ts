import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'

// GET /api/auth/me - Get current user data with role
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request)

    if (!userId) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Fetch complete user data from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        profileImage: true,
        role: true,
        createdAt: true,
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Error fetching user data:', error)
    
    if (error instanceof Error && error.name === 'JWTExpired') {
      return NextResponse.json({ error: 'Token expired' }, { status: 401 })
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}