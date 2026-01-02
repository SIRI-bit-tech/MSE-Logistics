import { Injectable } from "@nestjs/common"

@Injectable()
export class MapboxConfig {
  accessToken = process.env.MAPBOX_ACCESS_TOKEN

  validate() {
    if (!this.accessToken) {
      throw new Error("MAPBOX_ACCESS_TOKEN is not set")
    }
    return this
  }
}
