import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class UploadService {
  async uploadFile(file: any): Promise<string> {
    // Return the file path relative to the uploads directory
    return `/uploads/${file.filename}`;
  }

  getFilePath(filename: string): string {
    return join(process.cwd(), 'uploads', filename);
  }
}
