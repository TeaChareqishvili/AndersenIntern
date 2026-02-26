import {
  ApplicationConfig,
  ErrorHandler,
  ENVIRONMENT_INITIALIZER,
  inject,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  authTokenInterceptor,
  errorInterceptor,
  GlobalErrorHandler,
  HeaderActionsOrchestratorService,
} from '@shared';
import { baseUrlProvider, TokenProvider } from '@env';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authTokenInterceptor, errorInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => inject(HeaderActionsOrchestratorService).init(),
    },
    baseUrlProvider,
    TokenProvider,
  ],
};
