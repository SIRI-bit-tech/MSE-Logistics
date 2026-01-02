import { Injectable } from "@nestjs/common"

@Injectable()
export class EmailConfig {
  provider = process.env.EMAIL_PROVIDER || "sendgrid"
  sendgridKey = process.env.SENDGRID_API_KEY
  fromEmail = process.env.EMAIL_FROM || "noreply@mse.com"

  validate() {
    if (this.provider === "sendgrid" && !this.sendgridKey) {
      throw new Error("SENDGRID_API_KEY is required for SendGrid provider")
    }
    return this
  }
}
