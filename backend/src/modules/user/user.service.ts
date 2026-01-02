import { Injectable } from "@nestjs/common"
import type { PrismaService } from "../prisma/prisma.service"

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
    })
  }

  async updateProfile(id: string, data: any) {
    return await this.prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        profileImage: data.profileImage,
      },
    })
  }

  async addAddress(userId: string, data: any) {
    return await this.prisma.address.create({
      data: {
        userId,
        type: data.type,
        label: data.label,
        address: data.address,
        city: data.city,
        country: data.country,
        postalCode: data.postalCode,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    })
  }

  async getAddresses(userId: string) {
    return await this.prisma.address.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })
  }

  async addPaymentMethod(userId: string, data: any) {
    return await this.prisma.paymentMethod.create({
      data: {
        userId,
        type: data.type,
        cardLast4: data.cardLast4,
        cardBrand: data.cardBrand,
        expiryMonth: data.expiryMonth,
        expiryYear: data.expiryYear,
      },
    })
  }

  async getPaymentMethods(userId: string) {
    return await this.prisma.paymentMethod.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })
  }
}
