import { Injectable } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import { PrismaService } from "../modules/prisma/prisma.service"

@Injectable()
export class AnalyticsJob {
  constructor(private readonly prisma: PrismaService) {}

  @Cron("0 * * * * *") // Every hour
  async calculateHourlyMetrics() {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)

    const newShipments = await this.prisma.shipment.count({
      where: {
        createdAt: {
          gte: oneHourAgo,
        },
      },
    })

    const deliveredShipments = await this.prisma.shipment.count({
      where: {
        status: "DELIVERED",
        updatedAt: {
          gte: oneHourAgo,
        },
      },
    })

    // Skip payment aggregation since Payment model doesn't exist
    console.log(`Hourly Metrics - New: ${newShipments}, Delivered: ${deliveredShipments}`)
  }

  @Cron("0 0 * * * *") // Every day at midnight
  async calculateDailyMetrics() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)

    const totalUsers = await this.prisma.user.count()
    // Skip lastLogin field since it doesn't exist
    const activeUsers = await this.prisma.user.count({
      where: {
        updatedAt: {
          gte: oneDayAgo,
        },
      },
    })

    const totalShipments = await this.prisma.shipment.count({
      where: {
        createdAt: {
          gte: oneDayAgo,
        },
      },
    })

    console.log(`Daily Metrics - Users: ${totalUsers}, Active: ${activeUsers}, Shipments: ${totalShipments}`)
  }

  private async calculateAverageDeliveryTime(): Promise<number> {
    const delivered = await this.prisma.shipment.findMany({
      where: {
        status: "DELIVERED",
        actualDeliveryDate: {
          not: null,
        },
      },
      select: {
        createdAt: true,
        actualDeliveryDate: true,
      },
      take: 100,
    })

    if (delivered.length === 0) return 0

    const totalTime = delivered.reduce((sum, shipment) => {
      const time = shipment.actualDeliveryDate!.getTime() - shipment.createdAt.getTime()
      return sum + time
    }, 0)

    return Math.round(totalTime / delivered.length / (1000 * 60 * 60)) // Return hours
  }
}
