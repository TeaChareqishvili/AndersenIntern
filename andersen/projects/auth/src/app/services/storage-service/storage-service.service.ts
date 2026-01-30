import { Injectable } from '@angular/core';
import { SessionState } from '../../models/auth.models';

export interface StorageState<T extends object> {
  getItem<T>(key: string): T | null

  setItem<T>(key: string, value: T): void
}

@Injectable({
  providedIn: 'root',
})
export class StorageService implements StorageState<SessionState> {
  private readonly STORAGE_KEY = 'APP_SESSION_STATE';

  getItem<T>(key: string): T | null {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as T;
    } catch (err) {
      console.log(`Error: ${err} in storage service with the ${key} key`);
      return null;
    }
  }

  setItem<T>(key: string, value: T): void {
    try {
      if (value === null) {
        localStorage.removeItem(key);
        return;
      }

      localStorage?.setItem(key, JSON.stringify(value));
    } catch {
      console.error('Hello world');
    }
  }
}
