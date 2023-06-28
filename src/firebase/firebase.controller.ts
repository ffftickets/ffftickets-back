import { Controller, Post, Body, Res, Logger } from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiTags } from '@nestjs/swagger';
import { getStorage, ref, uploadString } from 'firebase/storage';
import { UploadBase64ImageDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { Response } from 'express';
import { handleError } from 'src/common/helpers/error-handler.helper';
@ApiTags('Firebase')
@Controller('firebase')
export class FirebaseController {
  constructor(private readonly firebaseService: FirebaseService) {}
  logger = new Logger(FirebaseController.name);
  @Post('upload')
  async uploadBase64(@Body() body: UploadBase64ImageDto, @Res() res: Response) {
    try {
      const imageName = uuidv4();
      const imageData = body.image.includes('data:')
        ? body.image.split(',')[1]
        : body.image;
      const storage = getStorage(
        this.firebaseService.firebaseApp,
        this.firebaseService.storageBucket,
      );

      const storageRef = ref(storage, `${body.route}/${imageName}`);

      const result = await uploadString(storageRef, imageData, 'base64', {
        contentType: 'image/jpeg',
      });

      const bucket = result.metadata.bucket;
      const imagePath = result.metadata.fullPath;

      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(
        imagePath,
      )}?alt=media`;

      return { imageUrl };
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
}
