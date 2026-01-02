import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { AuthService } from "./auth.service"
import { AuthResolver } from "./auth.resolver"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { PrismaModule } from "../prisma/prisma.module"

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || "your-secret-key",
      signOptions: { expiresIn: "24h" },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
