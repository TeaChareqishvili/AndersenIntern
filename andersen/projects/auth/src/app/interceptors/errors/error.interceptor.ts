import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ResponseMessageService } from '../../services/response-message/response-message.service';
import { BackendError } from '../../models/auth.models';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../../app.routes';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const responseMessage = inject(ResponseMessageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Unexpected error occurred';

      if (error instanceof HttpErrorResponse) {
        const backendError = error.error as BackendError | null;

        if (backendError?.error) {
          message = backendError.error;
        }

        if (error.status === 401) {
          responseMessage.error('Session expired. Please log in again.');
          router.navigate([AUTH_ROUTES.LOGIN]);
          return throwError(() => 'Unauthorized');
        }

        responseMessage.error(`${message}  🔴`);

        return throwError(() => message);
      }

      return throwError(() => error);
    }),
  );
};
