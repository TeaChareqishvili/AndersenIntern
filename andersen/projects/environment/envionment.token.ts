import { InjectionToken } from '@angular/core';

export type Environment = {
  apiUrl: string;
};

export const ENVIRONMENT = new InjectionToken<Environment>('ENVIRONMENT');
