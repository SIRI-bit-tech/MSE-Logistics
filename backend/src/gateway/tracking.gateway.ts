import { Injectable } from "@nestjs/common"
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import type { Server, Socket } from "socket.io"
import { PrismaService } from "../modules/prisma/prisma.service"
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
      include: { 
        assignments: {
          include: {
            driver: {
              include: {
                locationHistory: {
                  orderBy: { createdAt: 'desc' },
                  take: 1
                }
              }
            }
          }
        }
      },
    })

    if (shipment?.assignments?.[0]?.driver?.locationHistory?.[0]) {
      const location = shipment.assignments[0].driver.locationHistory[0]
      client.emit("tracking:location", {
        shipmentId: data.shipmentId,
        latitude: location.latitude,
        longitude: location.longitude,
        accuracy: location.accuracy || 0,
        timestamp: location.createdAt,
      })
    }
  }

  @SubscribeMessage("tracking:driver-location-update")
  async handleDriverLocationUpdate(
    client: Socket,
    data: { shipmentId: string; latitude: number; longitude: number; accuracy: number },
  ) {
    // Find the driver assigned to this shipment
    const shipment = await this.prisma.shipment.findUnique({
      where: { id: data.shipmentId },
      include: {
        assignments: {
          include: { driver: true }
        }
      }
    })

    if (shipment?.assignments?.[0]?.driver) {
      const driver = shipment.assignments[0].driver
      
      // Create new location entry for the driver
      await this.prisma.driverLocation.create({
        data: {
          driverId: driver.id,
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: data.accuracy,
        },
      })

      // Update driver's current location
      await this.prisma.driver.update({
        where: { id: driver.id },
        data: {
          currentLatitude: data.latitude,
          currentLongitude: data.longitude,
          lastLocationUpdate: new Date(),
        }
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
