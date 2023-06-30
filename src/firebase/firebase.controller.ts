import {
  Controller,
  Post,
  Body,
  Res,
  Logger,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { ApiTags } from '@nestjs/swagger';

import { DeleteImg, UploadBase64ImageDto } from './dto';

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
      const data = await this.firebaseService.uploadBase64(body);
      return data;
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
  @Delete('img')
  async deleteImg(@Body() body: DeleteImg, @Res() res: Response) {
    try {
      await this.firebaseService.deleteImageByUrl(body.image);
      return res.status(HttpStatus.OK).json('Imagen eliminada correctamente.');
    } catch (error) {
      this.logger.error(error);
      const errorData = handleError(error);
      return res.status(errorData.statusCode).json(errorData);
    }
  }
}
