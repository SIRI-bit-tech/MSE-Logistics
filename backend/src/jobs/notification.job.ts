import { Injectable } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import type { PrismaService } from "../modules/prisma/prisma.service"
import type { NotificationGateway } from "../gateway/notification.gateway"
import type { EmailService } from "../modules/notification/email.service"

@Injectable()
export class NotificationJob {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notificationGateway: NotificationGateway,
    private readonly emailService: EmailService,
  ) {}

  @Cron("0 */10 * * * *") // Every 10 minutes
  async sendPendingNotifications() {
    const pendingNotifications = await this.prisma.notification.findMany({
      where: {
        sentAt: null,
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
          data: notification.data as Record<string, any>,
          read: false,
          createdAt: notification.createdAt,
        })

        // Also send email notification
        if (notification.user?.email) {
          await this.emailService.sendNotificationEmail(notification.user.email, {
            title: notification.title,
            message: notification.message,
            type: notification.type,
          })
        }

        // Mark as sent
        await this.prisma.notification.update({
          where: { id: notification.id },
          data: { sentAt: new Date() },
        })
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
        read: true,
        createdAt: {
          lt: thirtyDaysAgo,
        },
      },
    })
  }
}
