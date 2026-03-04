import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './todo.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authTokenInterceptor, errorInterceptor, GlobalErrorHandler, loadingInterceptor } from '@shared';
import { baseUrlProvider, TokenProvider } from '@env';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor, loadingInterceptor, errorInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    baseUrlProvider,
    TokenProvider,
  ],
};
