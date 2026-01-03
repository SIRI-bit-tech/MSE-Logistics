import { Injectable } from "@nestjs/common"
import { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class DriverService {
  constructor(private prisma: PrismaService) {}

  async getDriver(id: string) {
    return await this.prisma.driver.findUnique({
      where: { id },
    })
  }

  async getAvailableDrivers() {
    return await this.prisma.driver.findMany({
      where: { status: "ACTIVE" },
    })
  }

  async updateDriverLocation(driverId: string, latitude: number, longitude: number) {
    await this.prisma.driver.update({
      where: { id: driverId },
      data: {
        currentLatitude: latitude,
        currentLongitude: longitude,
        lastLocationUpdate: new Date(),
      },
    })

    return await this.prisma.driverLocation.create({
      data: {
        driverId,
        latitude,
        longitude,
      },
    })
  }
}
