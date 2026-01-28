import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getData(key: string): string | null {
    return localStorage.getItem(key);
  }

  setData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clearData(): void {
    localStorage.clear();
  }
}
