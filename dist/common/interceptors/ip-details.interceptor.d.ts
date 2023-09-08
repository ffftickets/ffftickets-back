import { Observable } from 'rxjs';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
export declare class IpDetailsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>>;
}
