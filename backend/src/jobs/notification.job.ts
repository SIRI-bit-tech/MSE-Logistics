import { Injectable } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import { PrismaService } from "../modules/prisma/prisma.service"
import { NotificationGateway } from "../gateway/notification.gateway"

@Injectable()
export class NotificationJob {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  @Cron("0 */10 * * * *") // Every 10 minutes
  async sendPendingNotifications() {
    const pendingNotifications = await this.prisma.notification.findMany({
      where: {
        isRead: false,
      },
      include: {
        user: true,
      },
    })

    for (const notification of pendingNotifications) {
      try {
        // Send via Socket.io if user is online
        this.notificationGateway.sendNotification(notification.userId, {
          id: notification.id,
          type: notification.type,
          title: notification.title,
          message: notification.message,
          read: false,
          createdAt: notification.createdAt,
        })

        console.log(`Sent notification ${notification.id} to user ${notification.userId}`)
      } catch (error) {
        console.error(`Failed to send notification ${notification.id}:`, error)
      }
    }
  }

  @Cron("0 0 * * * *") // Every day at midnight
  async cleanupOldNotifications() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    await this.prisma.notification.deleteMany({
      where: {
        isRead: true,
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    })
  }
}
