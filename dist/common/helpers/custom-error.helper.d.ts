import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorData } from './dto';
export declare const customError: (error: any) => ErrorData;
export declare class MyCustomException extends HttpException {
    constructor(message: string, status: HttpStatus);
}
