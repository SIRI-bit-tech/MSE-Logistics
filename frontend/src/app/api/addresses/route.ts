import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createAddressSchema = z.object({
  type: z.enum(['HOME', 'BUSINESS', 'OTHER']),
  label: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  isDefault: z.boolean().optional(),
})

// GET /api/addresses - Get user's addresses
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const addresses = await prisma.address.findMany({
      where: { userId: session.user.id },
      orderBy: [
        { isDefault: 'desc' },
        { createdAt: 'desc' },
      ],
    })

    return NextResponse.json(addresses)
  } catch (error) {
    console.error('Error fetching addresses:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/addresses - Create new address
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createAddressSchema.parse(body)

    // If this is set as default, unset other defaults
    if (validatedData.isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: session.user.id,
          isDefault: true,
        },
        data: { isDefault: false },
      })
    }

    const address = await prisma.address.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      },
    })

    return NextResponse.json(address, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 })
    }
    console.error('Error creating address:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}