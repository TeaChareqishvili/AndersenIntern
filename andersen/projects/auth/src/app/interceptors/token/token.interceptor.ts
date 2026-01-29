import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { inject } from '@angular/core';
import { from, switchMap, tap } from 'rxjs';
import { StorageService } from '../../services/storage-service/storage-service.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);

  const tokenEndPoint = '/sign-up';

  return from(storage.getData()).pipe(
    switchMap((sessionState) => {
      const token = sessionState.token;

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
              storage.setData((state) => ({ ...state, token: newToken }));
            }
          }
        }),
      );
    }),
  );
};
