import { Injectable } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import type { PrismaService } from "../modules/prisma/prisma.service"
import type { TrackingGateway } from "../gateway/tracking.gateway"
import { ShipmentStatus } from "../graphql/schema/enums"

@Injectable()
export class TrackingUpdateJob {
  constructor(
    private readonly prisma: PrismaService,
    private readonly trackingGateway: TrackingGateway,
  ) {}

  @Cron("0 */5 * * * *") // Every 5 minutes
  async updateTrackingStatus() {
    const inTransitShipments = await this.prisma.shipment.findMany({
      where: {
        status: ShipmentStatus.IN_TRANSIT,
      },
    })

    for (const shipment of inTransitShipments) {
      // Simulate tracking update or fetch from actual tracking source
      const lastEvent = await this.prisma.trackingEvent.findFirst({
        where: { shipmentId: shipment.id },
        orderBy: { timestamp: "desc" },
      })

      if (lastEvent && new Date().getTime() - new Date(lastEvent.timestamp).getTime() > 3600000) {
        // No update in last hour, generate synthetic update
        await this.prisma.trackingEvent.create({
          data: {
            shipmentId: shipment.id,
            status: ShipmentStatus.IN_TRANSIT,
            message: "Shipment in transit",
            latitude: (Math.random() - 0.5) * 10 + lastEvent.latitude,
            longitude: (Math.random() - 0.5) * 10 + lastEvent.longitude,
            timestamp: new Date(),
          },
        })

        this.trackingGateway.broadcastTrackingUpdate(shipment.id, ShipmentStatus.IN_TRANSIT, "Shipment is in transit")
      }
    }
  }

  @Cron("0 0 * * * *") // Every hour
  async checkDeliveredShipments() {
    const outForDeliveryShipments = await this.prisma.shipment.findMany({
      where: {
        status: ShipmentStatus.OUT_FOR_DELIVERY,
      },
    })

    for (const shipment of outForDeliveryShipments) {
      const hoursOutForDelivery =
        (new Date().getTime() - new Date(shipment.updatedAt || shipment.createdAt).getTime()) / (1000 * 60 * 60)

      if (hoursOutForDelivery > 24) {
        // Mark as delivery attempted if out for delivery for more than 24 hours
        await this.prisma.shipment.update({
          where: { id: shipment.id },
          data: { status: ShipmentStatus.DELIVERY_ATTEMPTED },
        })

        this.trackingGateway.broadcastTrackingUpdate(
          shipment.id,
          ShipmentStatus.DELIVERY_ATTEMPTED,
          "Delivery attempt made",
        )
      }
    }
  }
}
