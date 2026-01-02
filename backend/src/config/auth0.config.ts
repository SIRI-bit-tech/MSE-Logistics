import { Injectable } from "@nestjs/common"

@Injectable()
export class Auth0Config {
  domain = process.env.AUTH0_DOMAIN
  clientId = process.env.AUTH0_CLIENT_ID
  clientSecret = process.env.AUTH0_CLIENT_SECRET
  adminDomain = process.env.AUTH0_ADMIN_DOMAIN
  adminClientId = process.env.AUTH0_ADMIN_CLIENT_ID
  adminClientSecret = process.env.AUTH0_ADMIN_CLIENT_SECRET

  validate() {
    const required = [
      { key: "AUTH0_DOMAIN", value: this.domain },
      { key: "AUTH0_CLIENT_ID", value: this.clientId },
      { key: "AUTH0_CLIENT_SECRET", value: this.clientSecret },
      { key: "AUTH0_ADMIN_DOMAIN", value: this.adminDomain },
    ]

    for (const { key, value } of required) {
      if (!value) throw new Error(`${key} is not set`)
    }
    return this
  }
}
