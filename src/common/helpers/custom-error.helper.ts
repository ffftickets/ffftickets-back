import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorData } from './dto';
import e from 'express';

export const customError = (error: any): ErrorData => {
  if (error.errno) {
    switch (error.errno) {
      case '1062':
        throw new InternalServerErrorException(error.detail, {
          cause: error,
          description: 'Unique constraint violation',
        });
      case '1452':
        throw new InternalServerErrorException(error.detail, {
          cause: error,
          description: 'Foreign key constraint violation',
        });
      default:
        throw new InternalServerErrorException(error.message, {
          cause: error,
          description: 'Database error',
        });
    }
  } else if (error.response) {
    throw new MyCustomException(
      error.response.message,
      error.response.statusCode,
    );
  }
   throw new InternalServerErrorException();
};

export class MyCustomException extends HttpException {
  constructor(message: string, status: HttpStatus) {
    super(message, status);
  }
}
