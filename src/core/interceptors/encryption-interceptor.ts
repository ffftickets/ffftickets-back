import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncryptionService } from 'src/encryption/encryption.service';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class EncryptionInterceptor implements NestInterceptor {
    constructor(private readonly encryptionService: EncryptionService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => {
        const jsonString = customStringify(data);
      
          const encryptData =   this.encryptionService.encryptData(jsonString);
          console.log('encryptData', encryptData);
           return encryptData;
      }),
    );
  }
}
// Ejemplo de cómo eliminar propiedades circulares de un objeto
function customStringify(obj) {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular Reference]";
        }
        seen.add(value);
      }
      return value;
    });
  }
  