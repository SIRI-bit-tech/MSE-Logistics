import { NestFactory } from "@nestjs/core"
import { ValidationPipe, HttpStatus } from "@nestjs/common"
import { AppModule } from "./app.module"
import { HttpExceptionFilter } from "./common/filters/http-exception.filter"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Global error filters for secure error handling
  app.useGlobalFilters(new HttpExceptionFilter())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors: any[]) => {
        const messages = errors.map((error: any) => Object.values(error.constraints || {}).join(", ")).join("; ")

        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Invalid input data",
          errorCode: "VALIDATION_ERROR",
          details: process.env.NODE_ENV === "development" ? messages : undefined,
        }
      },
    }),
  )

  app.enableCors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3000", "http://localhost:3000"],
    credentials: true,
  })

  const port = process.env.PORT || 3001
  await app.listen(port)
  console.log(`Mediterranean Shipping Express Backend running on http://localhost:${port}/graphql`)
}

bootstrap()
