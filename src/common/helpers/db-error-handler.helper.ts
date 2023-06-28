import { InternalServerErrorException } from '@nestjs/common';
import { ErrorData } from './dto';


export const handleDbError = (error: any): ErrorData => {
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
};
