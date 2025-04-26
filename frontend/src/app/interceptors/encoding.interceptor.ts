import { HttpInterceptorFn } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const encodingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('.json')) {
    const newReq = req.clone({
      responseType: 'text' as const,
    });
    return next(newReq).pipe(
      map((event) => {
        if (event.type === 4) {
          const response = event as any;
          if (typeof response.body === 'string') {
            const bodyWithoutBOM = response.body.replace(/^\uFEFF/, '');
            return response.clone({ body: JSON.parse(bodyWithoutBOM) });
          }
        }
        return event;
      })
    );
  }
  return next(req);
};
