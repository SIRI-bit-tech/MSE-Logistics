import { Module } from "@nestjs/common"
import { DriverService } from "./driver.service"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [PrismaModule],
  providers: [DriverService],
  exports: [DriverService],
})
export class DriverModule {}
