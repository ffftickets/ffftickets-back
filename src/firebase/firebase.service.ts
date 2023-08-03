import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp } from 'firebase/app';
import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from 'src/config/config.env';
import { deleteObject, getStorage, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { UploadBase64ImageDto } from './dto';
import { customError } from 'src/common/helpers/custom-error.helper';
@Injectable()
export class FirebaseService {
  /**
   * Configuración de firebase
   */
  private firebaseConfig = {
    apiKey: this.configService.get(FIREBASE_API_KEY),
    authDomain: this.configService.get(FIREBASE_AUTH_DOMAIN),
    projectId: this.configService.get(FIREBASE_PROJECT_ID),
    storageBucket: this.configService.get(FIREBASE_STORAGE_BUCKET),
    messagingSenderId: this.configService.get(FIREBASE_MESSAGING_SENDER_ID),
    appId: this.configService.get(FIREBASE_APP_ID),
    measurementId: this.configService.get(FIREBASE_MEASUREMENT_ID),
  };

  firebaseApp = null;

  storageBucket = `gs://${this.firebaseConfig.storageBucket}`;
  logger = new Logger(FirebaseService.name);
  constructor(private readonly configService: ConfigService) {
    this.firebaseApp = initializeApp(this.firebaseConfig);
  }
  async uploadBase64(body: UploadBase64ImageDto) {
    try {
      const imageName = uuidv4();
      const imageData = body.image.includes('data:')
        ? body.image.split(',')[1]
        : body.image;
      const storage = getStorage(this.firebaseApp, this.storageBucket);

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
      this.logger.error('Error al eliminar la imagen:', error);
      customError(error);
    }
  }
  async deleteImageByUrl(imageUrl: string) {
    const decodedUrl = decodeURIComponent(imageUrl);
    const startIndex = decodedUrl.indexOf('/o/');

    if (startIndex === -1) {
      throw new BadRequestException('El enlace proporcionado no es válido.');
    }

    const imagePath = decodedUrl.substring(
      startIndex + 3,
      decodedUrl.indexOf('?'),
    );
    const storage = getStorage();
    const imageRef = ref(storage, imagePath);

    try {
      const data = await deleteObject(imageRef);
      this.logger.log('Imagen eliminada correctamente.');
      return true;
    } catch (error) {
      this.logger.error('Error al eliminar la imagen:', error);
      return;
    }
  }
}
