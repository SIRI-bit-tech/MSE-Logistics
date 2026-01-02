import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  type OnGatewayConnection,
  type OnGatewayDisconnect,
} from "@nestjs/websockets"
import type { Server, Socket } from "socket.io"
import { Injectable } from "@nestjs/common"

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
})
@Injectable()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server

  private userSockets: Map<string, Socket> = new Map()

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string
    if (userId) {
      this.userSockets.set(userId, client)
      client.join(`user:${userId}`)
    }
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socket] of this.userSockets.entries()) {
      if (socket.id === client.id) {
        this.userSockets.delete(userId)
        break
      }
    }
  }

  @SubscribeMessage("subscribe:tracking")
  handleTrackingSubscription(client: Socket, data: { shipmentId: string }) {
    const roomName = `tracking:${data.shipmentId}`
    client.join(roomName)
    client.emit("tracking:subscribed", { shipmentId: data.shipmentId })
  }

  @SubscribeMessage("unsubscribe:tracking")
  handleTrackingUnsubscription(client: Socket, data: { shipmentId: string }) {
    const roomName = `tracking:${data.shipmentId}`
    client.leave(roomName)
    client.emit("tracking:unsubscribed", { shipmentId: data.shipmentId })
  }

  notifyShipmentUpdate(shipmentId: string, data: any) {
    this.server.to(`tracking:${shipmentId}`).emit("shipment:updated", data)
  }

  notifyUserNotification(userId: string, notification: any) {
    this.server.to(`user:${userId}`).emit("notification:received", notification)
  }

  broadcastNotification(message: string) {
    this.server.emit("notification:broadcast", { message, timestamp: new Date() })
  }
}
