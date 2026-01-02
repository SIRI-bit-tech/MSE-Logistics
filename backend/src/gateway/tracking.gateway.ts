import { Injectable } from "@nestjs/common"
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import type { Server, Socket } from "socket.io"
import type { PrismaService } from "../modules/prisma/prisma.service"
import type { ShipmentStatus } from "../graphql/schema/enums"

@WebSocketGateway()
@Injectable()
export class TrackingGateway {
  @WebSocketServer()
  server: Server

  constructor(private readonly prisma: PrismaService) {}

  @SubscribeMessage("tracking:get-location")
  async handleGetLocation(client: Socket, data: { shipmentId: string }) {
    const shipment = await this.prisma.shipment.findUnique({
      where: { id: data.shipmentId },
      include: { driverLocation: true },
    })

    if (shipment?.driverLocation) {
      client.emit("tracking:location", {
        shipmentId: data.shipmentId,
        latitude: shipment.driverLocation.latitude,
        longitude: shipment.driverLocation.longitude,
        accuracy: shipment.driverLocation.accuracy,
        timestamp: shipment.driverLocation.timestamp,
      })
    }
  }

  @SubscribeMessage("tracking:driver-location-update")
  async handleDriverLocationUpdate(
    client: Socket,
    data: { shipmentId: string; latitude: number; longitude: number; accuracy: number },
  ) {
    // Update driver location in database
    const shipment = await this.prisma.shipment.findUnique({
      where: { id: data.shipmentId },
    })

    if (shipment) {
      await this.prisma.driverLocation.upsert({
        where: { shipmentId: data.shipmentId },
        update: {
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: data.accuracy,
          timestamp: new Date(),
        },
        create: {
          shipmentId: data.shipmentId,
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: data.accuracy,
          timestamp: new Date(),
        },
      })

      // Broadcast to all users watching this shipment
      this.server.to(`tracking:${data.shipmentId}`).emit("tracking:location-update", {
        shipmentId: data.shipmentId,
        latitude: data.latitude,
        longitude: data.longitude,
        accuracy: data.accuracy,
        timestamp: new Date(),
      })
    }
  }

  broadcastTrackingUpdate(shipmentId: string, status: ShipmentStatus, message: string) {
    this.server.to(`tracking:${shipmentId}`).emit("tracking:status-update", {
      shipmentId,
      status,
      message,
      timestamp: new Date(),
    })
  }
}
