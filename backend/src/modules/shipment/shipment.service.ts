import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"
import { GeoService } from "../geo/geo.service"
import { ShipmentStatus } from "@prisma/client"
import * as crypto from "crypto"

@Injectable()
export class ShipmentService {
  constructor(
    private prisma: PrismaService,
    private geoService: GeoService,
  ) {}

  generateTrackingNumber(): string {
    return "SG" + crypto.randomBytes(8).toString("hex").toUpperCase()
  }

  calculateShippingCost(weight: number, distance: number, serviceType: string): number {
    const baseRate = 5 // $5 base
    const weightRate = weight * 0.5 // $0.5 per kg
    const distanceRate = (distance / 1000) * 0.01 // $0.01 per km

    let serviceFactor = 1
    if (serviceType === "EXPRESS") serviceFactor = 1.5
    if (serviceType === "STANDARD") serviceFactor = 1
    if (serviceType === "ECONOMY") serviceFactor = 0.7

    return Math.round((baseRate + weightRate + distanceRate) * serviceFactor * 100) / 100
  }

  async createShipment(userId: string, data: any) {
    const distance = await this.geoService.calculateDistance(
      data.senderLatitude,
      data.senderLongitude,
      data.recipientLatitude,
      data.recipientLongitude,
    )

    const shippingCost = this.calculateShippingCost(data.weight, distance, data.serviceType)

    const trackingNumber = this.generateTrackingNumber()

    return await this.prisma.shipment.create({
      data: {
        trackingNumber,
        userId,
        senderName: data.senderName,
        senderEmail: data.senderEmail,
        senderPhone: data.senderPhone,
        senderAddress: data.senderAddress,
        senderCity: data.senderCity,
        senderCountry: data.senderCountry,
        senderPostalCode: data.senderPostalCode,
        senderLatitude: data.senderLatitude,
        senderLongitude: data.senderLongitude,
        recipientName: data.recipientName,
        recipientEmail: data.recipientEmail,
        recipientPhone: data.recipientPhone,
        recipientAddress: data.recipientAddress,
        recipientCity: data.recipientCity,
        recipientCountry: data.recipientCountry,
        recipientPostalCode: data.recipientPostalCode,
        recipientLatitude: data.recipientLatitude,
        recipientLongitude: data.recipientLongitude,
        packageType: data.packageType,
        weight: data.weight,
        length: data.length,
        width: data.width,
        height: data.height,
        description: data.description,
        value: data.value,
        serviceType: data.serviceType,
        shippingCost,
        totalCost: shippingCost,
        status: ShipmentStatus.PENDING,
      },
    })
  }

  async getShipment(id: string) {
    return await this.prisma.shipment.findUnique({
      where: { id },
      include: {
        trackingEvents: { orderBy: { createdAt: "desc" } },
        assignments: { include: { driver: true } },
      },
    })
  }

  async getShipmentByTracking(trackingNumber: string) {
    return await this.prisma.shipment.findUnique({
      where: { trackingNumber },
      include: {
        trackingEvents: { orderBy: { createdAt: "desc" } },
      },
    })
  }

  async getUserShipments(userId: string, skip: number, take: number) {
    return await this.prisma.shipment.findMany({
      where: { userId, deletedAt: null },
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: { trackingEvents: { take: 1, orderBy: { createdAt: "desc" } } },
    })
  }

  async updateShipmentStatus(id: string, status: ShipmentStatus, data?: any) {
    const shipment = await this.prisma.shipment.update({
      where: { id },
      data: { status },
    })

    if (data) {
      await this.prisma.trackingEvent.create({
        data: {
          shipmentId: id,
          status,
          location: data.location || shipment.recipientCity,
          city: data.city || shipment.recipientCity,
          country: data.country || shipment.recipientCountry,
          latitude: data.latitude,
          longitude: data.longitude,
          facility: data.facility,
          description: data.description || `Status updated to ${status}`,
          transportMode: data.transportMode,
          notes: data.notes,
          updatedBy: data.updatedBy || "SYSTEM",
        },
      })
    }

    return shipment
  }

  async assignDriver(shipmentId: string, driverId: string) {
    return await this.prisma.shipmentAssignment.create({
      data: {
        shipmentId,
        driverId,
      },
      include: { driver: true },
    })
  }

  async searchShipments(query: string, skip: number, take: number) {
    return await this.prisma.shipment.findMany({
      where: {
        OR: [
          { trackingNumber: { contains: query, mode: "insensitive" } },
          { recipientName: { contains: query, mode: "insensitive" } },
          { recipientEmail: { contains: query, mode: "insensitive" } },
        ],
      },
      skip,
      take,
      orderBy: { createdAt: "desc" },
    })
  }

  async getAllShipments(skip: number, take: number) {
    return await this.prisma.shipment.findMany({
      where: { deletedAt: null },
      skip,
      take,
      orderBy: { createdAt: "desc" },
      include: { 
        trackingEvents: { take: 1, orderBy: { createdAt: "desc" } },
        user: { select: { id: true, email: true, firstName: true, lastName: true } }
      },
    })
  }
}
