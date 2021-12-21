import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

import { Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler): Observable<unknown> {
    console.log('context:', context);

    return handler.handle().pipe(
      map((data: unknown) => {
        console.log('Im running before response is sent out', data);
      }),
    );
  }
}
