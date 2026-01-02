import { Injectable } from "@nestjs/common"

@Injectable()
export class DatabaseConfig {
  url = process.env.DATABASE_URL

  validate() {
    if (!this.url) {
      throw new Error("DATABASE_URL is not set in environment variables")
    }
    return this
  }
}
