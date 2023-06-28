import { HttpStatus } from '@nestjs/common';
import { ErrorData } from './dto';


export const handleError = (error: any): ErrorData => {
  if (error.response) {
    const { response } = error;
    switch (error.status) {
      case 400:
      case 401:
      case 403:
      case 404:
      case 500:
      case 501:
      case 503:
        return response;
      default:
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ha ocurrido un error al procesar la solicitud',
          error: 'Internal Server Error',
        };
    }
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: `Ha ocurrido un error. Si persiste contacte a soporte técnico`,
    error: 'Internal Server Error',
  };
};
