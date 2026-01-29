import { Injectable } from '@angular/core';
import { SessionState } from '../../models/auth.models';

export interface StorageState<T extends object> {
  getData(): Promise<T>;
  setData(updater: (state: T) => T): Promise<void>;
  clearData(): Promise<void>;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService implements StorageState<SessionState> {
  private readonly STORAGE_KEY = 'APP_SESSION_STATE';

  async getData(): Promise<SessionState> {
    const raw = localStorage.getItem(this.STORAGE_KEY);

    if (!raw) {
      return {};
    }

    try {
      return JSON.parse(raw) as SessionState;
    } catch (err) {
      return {};
    }
  }

  async setData(updater: (state: SessionState) => SessionState): Promise<void> {
    const currentState = await this.getData();
    const nextState = updater(currentState);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(nextState));
  }

  async clearData(): Promise<void> {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
