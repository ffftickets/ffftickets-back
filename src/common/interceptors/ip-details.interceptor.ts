import { Observable } from 'rxjs';
import * as UAParser from 'ua-parser-js';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import axios from 'axios';
import * as requestIp from 'request-ip';

@Injectable()
export class IpDetailsInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    request.headers['accept-version'] = '1.1.0';

    const parser = new UAParser(request.headers['user-agent']);

    const parserResults = parser.getResult();

    request.ua = parserResults;

    const ip = requestIp.getClientIp(request);

    try {
      const response = await axios.get(`http://ip-api.com/json/${ip}`);
      request['ip-details'] = response.data;
    } catch (error) {
      // TODO - Controlar error en la respuesta
      console.log('Error: ', error);
    }

    return next.handle();
  }
}
