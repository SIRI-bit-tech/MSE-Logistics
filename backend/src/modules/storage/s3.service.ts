import { Injectable } from "@nestjs/common"
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

@Injectable()
export class S3Service {
  private s3Client: S3Client
  private readonly s3Region = process.env.AWS_REGION || "us-east-1"
  private readonly s3Bucket = process.env.AWS_S3_BUCKET
  private readonly s3AccessKey = process.env.AWS_ACCESS_KEY_ID
  private readonly s3SecretKey = process.env.AWS_SECRET_ACCESS_KEY

  constructor() {
    if (!this.s3AccessKey || !this.s3SecretKey) {
      throw new Error("AWS credentials are not properly configured")
    }

    this.s3Client = new S3Client({
      region: this.s3Region,
      credentials: {
        accessKeyId: this.s3AccessKey,
        secretAccessKey: this.s3SecretKey,
      },
    })
  }

  async uploadFile(key: string, body: Buffer, contentType: string): Promise<string> {
    if (!this.s3Bucket) {
      throw new Error("S3 bucket is not configured")
    }

    const command = new PutObjectCommand({
      Bucket: this.s3Bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })

    await this.s3Client.send(command)
    return `https://${this.s3Bucket}.s3.${this.s3Region}.amazonaws.com/${key}`
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    if (!this.s3Bucket) {
      throw new Error("S3 bucket is not configured")
    }

    const command = new GetObjectCommand({
      Bucket: this.s3Bucket,
      Key: key,
    })

    return getSignedUrl(this.s3Client, command, { expiresIn })
  }

  async deleteFile(key: string): Promise<void> {
    if (!this.s3Bucket) {
      throw new Error("S3 bucket is not configured")
    }

    const command = new DeleteObjectCommand({
      Bucket: this.s3Bucket,
      Key: key,
    })

    await this.s3Client.send(command)
  }
}
