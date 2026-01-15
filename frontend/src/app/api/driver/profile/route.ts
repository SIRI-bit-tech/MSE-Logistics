import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const updateDriverProfileSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  phone: z.string().optional(),
  vehicle: z.string().optional(),
  bio: z.string().optional(),
})

// GET /api/driver/profile - Get driver profile
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has DRIVER role
    if (user.role !== 'DRIVER') {
      return NextResponse.json({ error: 'Access denied. Driver role required.' }, { status: 403 })
    }

    // Try to find associated driver record
    const driver = await prisma.driver.findUnique({
      where: { email: user.email },
    })

    // Combine user and driver data
    const profileData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone || '',
      licenseNumber: driver?.licenseNumber || '',
      vehicle: driver ? `${driver.vehicleType} - ${driver.vehicleNumber}` : '',
      bio: '', // Add bio field to User model if needed
    }

    return NextResponse.json(profileData)
  } catch (error) {
    console.error('Error fetching driver profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/driver/profile - Update driver profile
export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if user has DRIVER role
    if (user.role !== 'DRIVER') {
      return NextResponse.json({ error: 'Access denied. Driver role required.' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = updateDriverProfileSchema.parse(body)

    // Update user data
    const updateData: any = {}
    if (validatedData.firstName) updateData.firstName = validatedData.firstName
    if (validatedData.lastName) updateData.lastName = validatedData.lastName
    if (validatedData.phone !== undefined) updateData.phone = validatedData.phone

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
      },
    })

    // If vehicle info is provided, try to update driver record
    if (validatedData.vehicle) {
      const driver = await prisma.driver.findUnique({
        where: { email: user.email },
      })

      if (driver) {
        // Parse vehicle string (format: "Type - Number")
        const vehicleParts = validatedData.vehicle.split(' - ')
        if (vehicleParts.length === 2) {
          await prisma.driver.update({
            where: { email: user.email },
            data: {
              vehicleType: vehicleParts[0],
              vehicleNumber: vehicleParts[1],
            },
          })
        }
      }
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 })
    }
    console.error('Error updating driver profile:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
