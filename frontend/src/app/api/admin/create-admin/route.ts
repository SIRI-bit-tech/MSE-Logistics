import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { getUserFromToken } from '@/lib/jwt-config'
import bcrypt from 'bcryptjs'

// POST /api/admin/create-admin - Create admin account (public for first admin, SUPER_ADMIN only after)
export async function POST(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request)

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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Use transaction to prevent race condition when creating first admin
    const result = await prisma.$transaction(async (tx) => {
      // Check if any admin exists (inside transaction)
      const adminCount = await tx.user.count({
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
          throw new Error('UNAUTHORIZED')
        }

        const currentUser = await tx.user.findUnique({
          where: { id: userId }
        })

        if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
          throw new Error('FORBIDDEN')
        }
      }

      // Check if user already exists (inside transaction)
      const existingUser = await tx.user.findUnique({
        where: { email }
      })

      if (existingUser) {
        throw new Error('USER_EXISTS')
      }

      // Create admin user (inside transaction)
      const newAdmin = await tx.user.create({
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

      return newAdmin
    }, {
      isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      maxWait: 5000,
      timeout: 10000,
    })

    return NextResponse.json({ 
      success: true, 
      admin: result 
    })

  } catch (error) {
    // Handle custom transaction errors
    if (error instanceof Error) {
      if (error.message === 'UNAUTHORIZED') {
        return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
      }
      if (error.message === 'FORBIDDEN') {
        return NextResponse.json({ 
          error: 'Access denied. Super Admin privileges required.' 
        }, { status: 403 })
      }
      if (error.message === 'USER_EXISTS') {
        return NextResponse.json({ 
          error: 'User with this email already exists' 
        }, { status: 409 })
      }
    }
    
    // Handle Prisma unique constraint violation
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 409 }
        )
      }
      // Handle serialization failure (concurrent transaction conflict)
      if (error.code === 'P2034') {
        return NextResponse.json(
          { error: 'Another admin was created concurrently. Please try again.' },
          { status: 409 }
        )
      }
    }
    
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}