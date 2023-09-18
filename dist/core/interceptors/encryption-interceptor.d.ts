import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { EncryptionService } from 'src/encryption/encryption.service';
export declare class EncryptionInterceptor implements NestInterceptor {
    private readonly encryptionService;
    constructor(encryptionService: EncryptionService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
