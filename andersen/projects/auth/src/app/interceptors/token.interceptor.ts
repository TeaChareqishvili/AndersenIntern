import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { TokenService } from '../services/token-service/token-service.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(TokenService);
  const token = storage.getToken();

  const authReq = token
    ? req.clone({
        setHeaders: {
          'T-Auth': token,
        },
      })
    : req;

  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        const newToken = event.headers.get('T-Auth');

        if (newToken) {
          storage.setToken(newToken);
        }
      }
    }),
  );
};
