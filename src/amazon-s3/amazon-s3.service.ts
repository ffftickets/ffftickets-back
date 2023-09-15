import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import * as AWS from 'aws-sdk';

import { customError } from 'src/common/helpers/custom-error.helper';
import { UploadBase64ImageDto } from './dto/upload-base64-image.dto';

@Injectable()
export class AmazonS3Service {
  private s3: AWS.S3;
  private bucketName: string;
  private logger = new Logger(AmazonS3Service.name);

  constructor(private readonly configService: ConfigService) {
    // Configura las credenciales de AWS
  

    this.s3 = new AWS.S3({ region: this.configService.get('AWS_S3_BUCKET_REGION'), credentials:{
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    }});
    this.bucketName = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  async uploadBase64(body: UploadBase64ImageDto) {
    try {
      const imageName = uuidv4();
      const imageData = body.image.includes('data:')
        ? body.image.split(',')[1]
        : body.image;

      const params: AWS.S3.PutObjectRequest = {
        Bucket: this.bucketName,
        Key: `${body.route}/${imageName}`,
        Body: Buffer.from(imageData, 'base64'),
        ContentType: 'image/jpeg',
      };
      
      const result = await this.s3.upload(params).promise();

      const imageUrl = result.Location;

      return { imageUrl };
    } catch (error) {
      this.logger.error('Error al cargar la imagen:', error);
      customError(error);
    }
  }
  
  async deleteImageByUrl(imageUrl: string) {
    try {
      const decodedUrl = decodeURIComponent(imageUrl);
      const startIndex = decodedUrl.indexOf(`/${this.bucketName}/`);

      if (startIndex === -1) {
        throw new BadRequestException('El enlace proporcionado no es válido.');
      }

      const imagePath = decodedUrl.substring(
        startIndex + this.bucketName.length + 2,
        decodedUrl.indexOf('?'),
      );

      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: this.bucketName,
        Key: imagePath,
      };

      await this.s3.deleteObject(params).promise();

      this.logger.log('Imagen eliminada correctamente.');
      return true;
    } catch (error) {
      this.logger.error('Error al eliminar la imagen:', error);
      return false;
    }
  }
}
