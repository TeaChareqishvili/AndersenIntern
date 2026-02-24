import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { AUTH_ROUTES_CONFIG } from './auth.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor, errorInterceptor, GlobalErrorHandler } from '@shared';
import { baseUrlProvider, TokenProvider } from '@env';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(AUTH_ROUTES_CONFIG),
    provideHttpClient(withInterceptors([authTokenInterceptor, errorInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    baseUrlProvider,
    TokenProvider,
  ],
};
