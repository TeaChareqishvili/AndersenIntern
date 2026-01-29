import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor } from './interceptors/token/token.interceptor';
import { errorInterceptor } from './interceptors/errors/error.interceptor';
import { GlobalErrorHandler } from './interceptors/errors/global-error.handler';
import { provideEnvironment } from '../../../environment/environment.provider';
import { environment } from './url/url';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor, errorInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideEnvironment(environment),
  ],
};
