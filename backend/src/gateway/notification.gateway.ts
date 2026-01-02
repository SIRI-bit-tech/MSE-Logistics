import { Injectable } from "@nestjs/common"
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets"
import type { Server, Socket } from "socket.io"

@WebSocketGateway()
@Injectable()
export class NotificationGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage("notification:subscribe")
  handleNotificationSubscribe(client: Socket, data: { userId: string }) {
    client.join(`notifications:${data.userId}`)
    client.emit("notification:subscribed", { userId: data.userId })
  }

  @SubscribeMessage("notification:unsubscribe")
  handleNotificationUnsubscribe(client: Socket, data: { userId: string }) {
    client.leave(`notifications:${data.userId}`)
    client.emit("notification:unsubscribed", { userId: data.userId })
  }

  @SubscribeMessage("notification:mark-as-read")
  async handleMarkAsRead(client: Socket, data: { notificationId: string }) {
    // Mark notification as read in database
    client.emit("notification:marked-as-read", { notificationId: data.notificationId })
  }

  sendNotification(
    userId: string,
    notification: {
      id: string
      type: string
      title: string
      message: string
      data?: Record<string, any>
      read: boolean
      createdAt: Date
    },
  ) {
    this.server.to(`notifications:${userId}`).emit("notification:new", notification)
  }

  sendBroadcastNotification(notification: any) {
    this.server.emit("notification:broadcast", notification)
  }
}
