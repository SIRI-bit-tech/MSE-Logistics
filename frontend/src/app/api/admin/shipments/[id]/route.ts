import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'
import { z } from 'zod'

const updateShipmentSchema = z.object({
  status: z.enum([
    'PENDING',
    'PROCESSING',
    'ON_HOLD',
    'PICKED_UP',
    'IN_TRANSIT',
    'IN_CUSTOMS',
    'CUSTOMS_CLEARED',
    'ARRIVED_AT_FACILITY',
    'OUT_FOR_DELIVERY',
    'DELIVERY_ATTEMPTED',
    'DELIVERED',
    'RETURNED',
    'CANCELLED',
  ]).optional(),
  currentLocation: z.string().optional(),
  currentLatitude: z.number().optional(),
  currentLongitude: z.number().optional(),
})

// PATCH /api/admin/shipments/[id] - Update shipment (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = await getUserFromToken(request)
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true, email: true }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = updateShipmentSchema.parse(body)

    // Check if shipment exists
    const existingShipment = await prisma.shipment.findUnique({
      where: { id },
    })

    if (!existingShipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {}
    
    if (validatedData.status) {
      updateData.status = validatedData.status
      
      // Update delivery date if status is DELIVERED
      if (validatedData.status === 'DELIVERED') {
        updateData.actualDeliveryDate = new Date()
      }
    }

    if (validatedData.currentLocation) {
      updateData.currentLocation = validatedData.currentLocation
      updateData.lastLocationUpdate = new Date()
    }

    if (validatedData.currentLatitude !== undefined) {
      updateData.currentLatitude = validatedData.currentLatitude
    }

    if (validatedData.currentLongitude !== undefined) {
      updateData.currentLongitude = validatedData.currentLongitude
    }

    // Update shipment
    const updatedShipment = await prisma.shipment.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        trackingNumber: true,
        status: true,
        currentLocation: true,
        currentLatitude: true,
        currentLongitude: true,
        lastLocationUpdate: true,
      },
    })

    // Create tracking event if status changed
    if (validatedData.status) {
      await prisma.trackingEvent.create({
        data: {
          shipmentId: id,
          status: validatedData.status,
          location: validatedData.currentLocation || existingShipment.currentLocation || 'Unknown',
          city: existingShipment.recipientCity,
          country: existingShipment.recipientCountry,
          latitude: validatedData.currentLatitude || existingShipment.currentLatitude,
          longitude: validatedData.currentLongitude || existingShipment.currentLongitude,
          description: `Status updated to ${validatedData.status} by admin`,
          updatedBy: user.email,
        },
      })
    }

    return NextResponse.json({ 
      message: 'Shipment updated successfully',
      shipment: updatedShipment 
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Validation error', 
        details: error.issues 
      }, { status: 400 })
    }
    console.error('Error updating shipment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/admin/shipments/[id] - Get single shipment (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    const shipment = await prisma.shipment.findUnique({
      where: { id },
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
        },
      },
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
