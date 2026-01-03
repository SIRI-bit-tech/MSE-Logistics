import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { ApolloDriver, type ApolloDriverConfig } from "@nestjs/apollo"
import { ScheduleModule } from "@nestjs/schedule"
import { join } from "path"
import { PrismaModule } from "./modules/prisma/prisma.module"
import { AuthModule } from "./modules/auth/auth.module"
import { ShipmentModule } from "./modules/shipment/shipment.module"
import { UserModule } from "./modules/user/user.module"
import { DriverModule } from "./modules/driver/driver.module"
import { NotificationModule } from "./modules/notification/notification.module"
import { TrackingModule } from "./modules/tracking/tracking.module"
import { GeoModule } from "./modules/geo/geo.module"
import { PricingModule } from "./modules/pricing/pricing.module"
import { RoutingModule } from "./modules/routing/routing.module"
import { PaymentModule } from "./modules/payment/payment.module"
import { StorageModule } from "./modules/storage/storage.module"
import { SocketGateway } from "./gateway/socket.gateway"
import { TrackingGateway } from "./gateway/tracking.gateway"
import { NotificationGateway } from "./gateway/notification.gateway"
import { TrackingUpdateJob } from "./jobs/tracking-update.job"
import { NotificationJob } from "./jobs/notification.job"
import { AnalyticsJob } from "./jobs/analytics.job"
import { GraphqlErrorFilter } from "./common/filters/graphql-error.filter"
import { AuthGuard } from "./common/guards/auth.guard"
import { RolesGuard } from "./common/guards/roles.guard"

// Import depth limit function
const depthLimit = require('graphql-depth-limit')

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      installSubscriptionHandlers: true,
      validationRules: [depthLimit(5)],
      context: ({ req, res }: { req: any; res: any }) => ({ req, res }),
      formatError: (error: any) => {
        // Only expose safe error information to clients
        const originalError = error.originalError as any
        return {
          message: originalError?.message || error.message,
          errorCode: originalError?.errorCode || "UNKNOWN_ERROR",
          statusCode: originalError?.statusCode || 500,
        }
      },
    }),
    PrismaModule,
    AuthModule,
    ShipmentModule,
    UserModule,
    DriverModule,
    NotificationModule,
    TrackingModule,
    GeoModule,
    PricingModule,
    RoutingModule,
    PaymentModule,
    StorageModule,
  ],
  providers: [
    SocketGateway,
    TrackingGateway,
    NotificationGateway,
    TrackingUpdateJob,
    NotificationJob,
    AnalyticsJob,
    GraphqlErrorFilter,
    AuthGuard,
    RolesGuard,
  ],
})
export class AppModule {}
