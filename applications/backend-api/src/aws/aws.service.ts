import { Injectable, Logger } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class AwsService {
  private readonly logger = new Logger(AwsService.name);
  private s3Client: S3Client | null = null;
  private bucketName: string | null = null;

  constructor(private configService: ConfigService) {
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');
    const region = this.configService.get<string>('AWS_REGION');
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME') || null;

    if (accessKeyId && secretAccessKey && region && this.bucketName) {
      this.s3Client = new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.logger.log(`AWS S3 Client initialized for bucket: ${this.bucketName}`);
    } else {
      this.logger.warn('AWS S3 credentials missing. Uploads will be mocked.');
    }
  }

  /**
   * Uploads an image buffer to S3.
   * If S3 is not configured, returns a fallback mock URL.
   */
  async uploadImage(buffer: Buffer, mimetype: string = 'image/jpeg'): Promise<string | null> {
    if (!this.s3Client || !this.bucketName) {
      this.logger.warn('AWS credentials missing, skipping S3 upload. Returning null.');
      return null;
    }

    try {
      const ext = mimetype.split('/')[1] || 'jpg';
      const filename = `recipes/${crypto.randomBytes(16).toString('hex')}.${ext}`;

      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: filename,
        Body: buffer,
        ContentType: mimetype,
        // ACL: 'public-read', // Uncomment if bucket policies allow ACLs
      });

      await this.s3Client.send(command);

      const region = this.configService.get<string>('AWS_REGION');
      const url = `https://${this.bucketName}.s3.${region}.amazonaws.com/${filename}`;
      this.logger.log(`Successfully uploaded image to ${url}`);
      
      return url;
    } catch (error: any) {
      this.logger.error(`Failed to upload to S3: ${error.message}`);
      // Fallback in case of upload failure so recipe generation doesn't completely break
      return 'https://loremflickr.com/800/600/food,error';
    }
  }
}
