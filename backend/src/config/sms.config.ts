import { Injectable } from "@nestjs/common"

@Injectable()
export class SmsConfig {
  provider = process.env.SMS_PROVIDER || "twilio"
  twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
  twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
  twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

  validate() {
    if (this.provider === "twilio") {
      const required = [
        { key: "TWILIO_ACCOUNT_SID", value: this.twilioAccountSid },
        { key: "TWILIO_AUTH_TOKEN", value: this.twilioAuthToken },
        { key: "TWILIO_PHONE_NUMBER", value: this.twilioPhoneNumber },
      ]

      for (const { key, value } of required) {
        if (!value) throw new Error(`${key} is required for Twilio`)
      }
    }
    return this
  }
}
