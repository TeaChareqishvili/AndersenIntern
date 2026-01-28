import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { StorageService } from '../services/storage-service/storage-service.service';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../app.routes';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const token = storage.getData('T-Auth');
  const router = inject(Router);
  const tokenEndPoint = '/sign-up';

  const authReq = token
    ? req.clone({
        setHeaders: {
          'T-Auth': token,
        },
      })
    : req;

  return next(authReq).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && !req.url.includes(tokenEndPoint)) {
        const newToken = event.headers.get('T-Auth');

        if (newToken) {
          storage.setData('T-Auth', newToken);
        }
      }
    }),

    catchError((err: HttpErrorResponse) => {
      if (err instanceof HttpErrorResponse && err.status === 401) {
        router.navigate([AUTH_ROUTES.LOGIN]);
      }
      return throwError(() => err);
    }),
  );
};
