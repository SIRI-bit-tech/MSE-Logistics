import { Injectable } from "@nestjs/common"

@Injectable()
export class StorageConfig {
  provider = process.env.STORAGE_PROVIDER || "s3"
  s3Region = process.env.AWS_REGION || "us-east-1"
  s3Bucket = process.env.AWS_S3_BUCKET
  s3AccessKey = process.env.AWS_ACCESS_KEY_ID
  s3SecretKey = process.env.AWS_SECRET_ACCESS_KEY

  validate() {
    if (this.provider === "s3") {
      const required = [
        { key: "AWS_S3_BUCKET", value: this.s3Bucket },
        { key: "AWS_ACCESS_KEY_ID", value: this.s3AccessKey },
        { key: "AWS_SECRET_ACCESS_KEY", value: this.s3SecretKey },
      ]

      for (const { key, value } of required) {
        if (!value) throw new Error(`${key} is required for S3`)
      }
    }
    return this
  }
}
