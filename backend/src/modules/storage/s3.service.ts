import { Injectable } from "@nestjs/common"
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import type { StorageConfig } from "../../config/storage.config"

@Injectable()
export class S3Service {
  private s3Client: S3Client

  constructor(private readonly config: StorageConfig) {
    this.s3Client = new S3Client({
      region: this.config.s3Region,
      credentials: {
        accessKeyId: this.config.s3AccessKey,
        secretAccessKey: this.config.s3SecretKey,
      },
    })
  }

  async uploadFile(key: string, body: Buffer, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.config.s3Bucket,
      Key: key,
      Body: body,
      ContentType: contentType,
    })

    await this.s3Client.send(command)
    return `https://${this.config.s3Bucket}.s3.${this.config.s3Region}.amazonaws.com/${key}`
  }

  async getSignedUrl(key: string, expiresIn = 3600): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.config.s3Bucket,
      Key: key,
    })

    return getSignedUrl(this.s3Client, command, { expiresIn })
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.config.s3Bucket,
      Key: key,
    })

    await this.s3Client.send(command)
  }
}
