import { Injectable } from "@nestjs/common"

@Injectable()
export class RedisConfig {
  host = process.env.REDIS_HOST || "localhost"
  port = Number.parseInt(process.env.REDIS_PORT || "6379")
  password = process.env.REDIS_PASSWORD
  db = Number.parseInt(process.env.REDIS_DB || "0")

  get url() {
    const auth = this.password ? `:${this.password}@` : ""
    return `redis://${auth}${this.host}:${this.port}/${this.db}`
  }

  validate() {
    if (!this.host) {
      throw new Error("REDIS_HOST is not set")
    }
    return this
  }
}
