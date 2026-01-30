import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { inject } from '@angular/core';
import { from, switchMap, tap } from 'rxjs';
import { StorageService } from '../../services/storage-service/storage-service.service';
import { SessionState } from '../../models/auth.models';

const APP_SESSION_STATE_KEY = 'APP_SESSION_STATE';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);

  const tokenEndPoint = ['/sign-in', 'sign-in/out'],
    { token } = storage.getItem<SessionState>(APP_SESSION_STATE_KEY) ?? { token: '' };

  const authReq = token
    ? req.clone({
        setHeaders: {
          'T-Auth': token,
        },
      })
    : req;

  return next(authReq).pipe(
    tap((event) => {
      if (
        event instanceof HttpResponse &&
        tokenEndPoint.some((endpoint) => req.url.includes(endpoint))
      ) {
        const token = event.headers.get('T-Auth') ?? '';

        if (!token) {
          storage.setItem<null>(APP_SESSION_STATE_KEY, null);
          return;
        }

        storage.setItem<SessionState>(APP_SESSION_STATE_KEY, { token });
      }
    }),
  );
};
