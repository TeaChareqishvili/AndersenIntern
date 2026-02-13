import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';

import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { SessionState, StorageService } from '@shared';
import { HARD_CODE_TOKEN } from '../../../../../environment/envionment.token';

const APP_SESSION_STATE_KEY = 'APP_SESSION_STATE';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const hardToken = inject(HARD_CODE_TOKEN);

  const tokenEndPoint = ['/sign-in', 'sign-in/out'],
    { token } = storage.getItem<SessionState>(APP_SESSION_STATE_KEY) ?? { token: '' };

  const finalToken = token || hardToken;

  const authReq = hardToken
    ? req.clone({
        setHeaders: {
          'T-Auth': finalToken,
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
