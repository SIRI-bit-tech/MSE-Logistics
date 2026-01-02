import { Injectable } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) {}

  async getTrackingHistory(shipmentId: string) {
    return await this.prisma.trackingEvent.findMany({
      where: { shipmentId },
      orderBy: { createdAt: "desc" },
    })
  }

  async addTrackingEvent(shipmentId: string, status: string, data: any) {
    return await this.prisma.trackingEvent.create({
      data: {
        shipmentId,
        status,
        location: data.location,
        city: data.city,
        country: data.country,
        latitude: data.latitude,
        longitude: data.longitude,
        facility: data.facility,
        description: data.description,
        transportMode: data.transportMode,
        notes: data.notes,
        updatedBy: data.updatedBy || "SYSTEM",
      },
    })
  }
}
