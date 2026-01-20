import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/jwt-config'
import { z } from 'zod'
import { emitTrackingUpdate, emitShipmentUpdate } from '@/app/api/socket/route'

const updateTrackingSchema = z.object({
  status: z.enum([
    'PENDING', 'PROCESSING', 'ON_HOLD', 'PICKED_UP', 'IN_TRANSIT',
    'IN_CUSTOMS', 'CUSTOMS_CLEARED', 'ARRIVED_AT_FACILITY',
    'OUT_FOR_DELIVERY', 'DELIVERY_ATTEMPTED', 'DELIVERED', 'RETURNED', 'CANCELLED'
  ]),
  location: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
  facility: z.string().optional(),
  description: z.string().min(1),
  transportMode: z.enum(['AIR', 'LAND', 'WATER', 'MULTIMODAL']).optional(),
  notes: z.string().optional(),
  estimatedDeliveryDate: z.string().optional(),
  actualDeliveryDate: z.string().optional(),
})

// POST /api/admin/shipments/[id]/tracking - Add tracking event with real-time updates
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const userId = await getUserFromToken(request)

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check admin privileges - fetch user role from database
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    // Check if shipment exists
    const shipment = await prisma.shipment.findUnique({
      where: { id },
      include: { user: true }
    })

    if (!shipment) {
      return NextResponse.json({ error: 'Shipment not found' }, { status: 404 })
    }

    const body = await request.json()
    const validatedData = updateTrackingSchema.parse(body)

    // Create tracking event with current timestamp
    const trackingEvent = await prisma.trackingEvent.create({
      data: {
        shipmentId: id,
        status: validatedData.status,
        location: validatedData.location,
        city: validatedData.city,
        country: validatedData.country,
        latitude: validatedData.latitude,
        longitude: validatedData.longitude,
        facility: validatedData.facility,
        description: validatedData.description,
        transportMode: validatedData.transportMode,
        notes: validatedData.notes,
        createdAt: new Date(), // Current timestamp
      },
    })

    // Update shipment with new status and delivery dates
    const updateData: any = {
      status: validatedData.status
    }

    // Update estimated delivery date if provided
    if (validatedData.estimatedDeliveryDate) {
      updateData.estimatedDeliveryDate = new Date(validatedData.estimatedDeliveryDate)
    }

    // Update actual delivery date if status is DELIVERED
    if (validatedData.status === 'DELIVERED') {
      updateData.actualDeliveryDate = validatedData.actualDeliveryDate
        ? new Date(validatedData.actualDeliveryDate)
        : new Date()
    }

    const updatedShipment = await prisma.shipment.update({
      where: { id },
      data: updateData,
      include: {
        trackingEvents: {
          orderBy: { createdAt: 'desc' },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          }
        }
      },
    })

    // Prepare real-time update data with all tracking information
    const realTimeData = {
      trackingNumber: shipment.trackingNumber,
      shipment: {
        id: updatedShipment.id,
        trackingNumber: updatedShipment.trackingNumber,
        status: updatedShipment.status,
        estimatedDeliveryDate: updatedShipment.estimatedDeliveryDate,
        actualDeliveryDate: updatedShipment.actualDeliveryDate,
        serviceType: updatedShipment.serviceType,
        transportMode: updatedShipment.transportMode,
      },
      trackingEvent: {
        id: trackingEvent.id,
        status: trackingEvent.status,
        location: trackingEvent.location,
        city: trackingEvent.city,
        country: trackingEvent.country,
        latitude: trackingEvent.latitude,
        longitude: trackingEvent.longitude,
        facility: trackingEvent.facility,
        description: trackingEvent.description,
        transportMode: trackingEvent.transportMode,
        notes: trackingEvent.notes,
        createdAt: trackingEvent.createdAt,
        timestamp: trackingEvent.createdAt.toISOString(),
      },
      currentLocation: {
        latitude: validatedData.latitude,
        longitude: validatedData.longitude,
        address: validatedData.location,
        city: validatedData.city,
        country: validatedData.country,
        facility: validatedData.facility,
        timestamp: new Date().toISOString(),
      }
    }

    // Emit real-time updates to tracking page
    emitTrackingUpdate(shipment.trackingNumber, realTimeData)

    // Emit updates to user's shipment dashboard
    emitShipmentUpdate(shipment.userId, {
      type: 'TRACKING_UPDATE',
      shipment: updatedShipment,
      trackingEvent,
      currentLocation: realTimeData.currentLocation,
    })

    // Create notification for user
    const notificationMessage = getNotificationMessage(validatedData.status, shipment.trackingNumber, validatedData.location)
    await prisma.notification.create({
      data: {
        userId: shipment.userId,
        type: 'TRACKING_UPDATE',
        title: 'Shipment Update',
        message: notificationMessage,
      },
    })

    return NextResponse.json({
      trackingEvent,
      shipment: updatedShipment,
      realTimeData
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to generate notification messages
function getNotificationMessage(status: string, trackingNumber: string, location: string): string {
  const statusMessages: Record<string, string> = {
    'PENDING': `Your shipment ${trackingNumber} is pending pickup`,
    'PROCESSING': `Your shipment ${trackingNumber} is being processed at ${location}`,
    'ON_HOLD': `Your shipment ${trackingNumber} is on hold at ${location}`,
    'PICKED_UP': `Your shipment ${trackingNumber} has been picked up from ${location}`,
    'IN_TRANSIT': `Your shipment ${trackingNumber} is in transit at ${location}`,
    'IN_CUSTOMS': `Your shipment ${trackingNumber} is in customs at ${location}`,
    'CUSTOMS_CLEARED': `Your shipment ${trackingNumber} has cleared customs at ${location}`,
    'ARRIVED_AT_FACILITY': `Your shipment ${trackingNumber} has arrived at facility in ${location}`,
    'OUT_FOR_DELIVERY': `Your shipment ${trackingNumber} is out for delivery in ${location}`,
    'DELIVERY_ATTEMPTED': `Delivery attempted for shipment ${trackingNumber} at ${location}`,
    'DELIVERED': `Your shipment ${trackingNumber} has been delivered at ${location}`,
    'RETURNED': `Your shipment ${trackingNumber} is being returned from ${location}`,
    'CANCELLED': `Your shipment ${trackingNumber} has been cancelled`,
  }

  return statusMessages[status] || `Your shipment ${trackingNumber} status updated to ${status.toLowerCase().replace('_', ' ')}`
}