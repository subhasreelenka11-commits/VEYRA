import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly uploadDir: string;

  constructor() {
    this.uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure the uploads directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
      this.logger.log(`Created upload directory at ${this.uploadDir}`);
    }
  }

  /**
   * Saves an image buffer to the local disk and returns the URL.
   */
  async uploadImage(buffer: Buffer, mimetype: string = 'image/jpeg'): Promise<string | null> {
    try {
      const ext = mimetype.split('/')[1] || 'jpg';
      const filename = `${crypto.randomBytes(16).toString('hex')}.${ext}`;
      const filePath = path.join(this.uploadDir, filename);

      // Write the file to disk
      await fs.promises.writeFile(filePath, buffer);

      // Return the local static URL
      const port = process.env.PORT || 5001;
      const url = `http://localhost:${port}/uploads/${filename}`;
      
      this.logger.log(`Successfully saved local image to ${filePath}`);
      return url;
    } catch (error: any) {
      this.logger.error(`Failed to save local image: ${error.message}`);
      return null;
    }
  }
}
