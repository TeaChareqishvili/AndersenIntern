import { Provider } from '@angular/core';
import { ENVIRONMENT } from './envionment.token';

export const provideEnvironment = (environment: string): Provider => ({
  provide: ENVIRONMENT,
  useValue: environment,
});
