import { Provider } from '@angular/core';
import { Environment, ENVIRONMENT } from './envionment.token';

export const provideEnvironment = (environment: Environment): Provider => ({
  provide: ENVIRONMENT,
  useValue: environment,
});
