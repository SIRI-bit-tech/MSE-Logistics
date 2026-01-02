import { Injectable } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  async createNotification(userId: string, type: string, title: string, message: string, shipmentId?: string) {
    return await this.prisma.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        shipmentId,
      },
    })
  }

  async getUserNotifications(userId: string, take = 10) {
    return await this.prisma.notification.findMany({
      where: { userId },
      take,
      orderBy: { createdAt: "desc" },
    })
  }

  async markAsRead(notificationId: string) {
    return await this.prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    })
  }
}
