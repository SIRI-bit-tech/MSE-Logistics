import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getUserFromToken } from '@/lib/jwt-config'
import bcrypt from 'bcryptjs'

// POST /api/admin/create-admin - Create admin account (public for first admin, SUPER_ADMIN only after)
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request)

    // Check if any admin exists
    const adminCount = await prisma.user.count({
      where: {
        OR: [
          { role: 'ADMIN' },
          { role: 'SUPER_ADMIN' }
        ]
      }
    })

    // If admins exist, require authentication and SUPER_ADMIN role
    if (adminCount > 0) {
      if (!userId) {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }

      const currentUser = await prisma.user.findUnique({
        where: { id: userId }
      })

      if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
        return NextResponse.json({ 
          error: 'Access denied. Super Admin privileges required.' 
        }, { status: 403 })
      }
    }

    const body = await request.json()
    const { firstName, lastName, email, phone, password, role } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ 
        error: 'Missing required fields' 
      }, { status: 400 })
    }

    // Validate role - only allow ADMIN and SUPER_ADMIN
    if (!role || !['ADMIN', 'SUPER_ADMIN'].includes(role)) {
      return NextResponse.json({ 
        error: 'Invalid role. Only ADMIN and SUPER_ADMIN are allowed.' 
      }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ 
        error: 'Password must be at least 8 characters long' 
      }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ 
        error: 'User with this email already exists' 
      }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create admin user
    const newAdmin = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: role as 'ADMIN' | 'SUPER_ADMIN',
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      }
    })

    return NextResponse.json({ 
      success: true, 
      admin: newAdmin 
    })

  } catch (error) {
    console.error('Error creating admin account:', error)
    
    // Handle Prisma unique constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}