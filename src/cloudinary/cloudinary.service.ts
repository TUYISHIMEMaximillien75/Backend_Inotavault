import { Injectable, BadRequestException } from '@nestjs/common';
import cloudinary from 'src/config/cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  uploadFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<{ url: string }> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    const resourceType = this.getResourceType(file.mimetype);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          access_mode: 'public',
          use_filename: true,
          unique_filename: false,
          filename_override: file.originalname,
        },
        (error: any, result: any) => {
          if (error) return reject(error);
          resolve({ url: result.secure_url });
        },
      );

      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  /**
   * Determines correct Cloudinary resource type
   */
  private getResourceType(mimeType: string): 'image' | 'video' | 'raw' {
    if (mimeType === 'application/pdf') {
      return 'raw'; // ✅ REQUIRED FOR PDFs
    }

    if (mimeType.startsWith('image/')) {
      return 'image';
    }

    if (mimeType.startsWith('video/') || mimeType.startsWith('audio/')) {
      return 'video'; // Cloudinary handles audio as video
    }

    return 'raw'; // fallback
  }
}
