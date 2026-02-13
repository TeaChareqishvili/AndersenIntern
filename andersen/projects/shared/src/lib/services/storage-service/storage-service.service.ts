import { Injectable } from '@angular/core';

export interface StorageState<T extends object> {
  getItem(key: string): T | null;

  setItem(key: string, value: T): void;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getItem<T>(key: string): T | null {
    const raw = sessionStorage.getItem(key);

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
        sessionStorage.removeItem(key);
        return;
      }

      sessionStorage?.setItem(key, JSON.stringify(value));
    } catch {
      console.error('Hello world');
    }
  }
}
