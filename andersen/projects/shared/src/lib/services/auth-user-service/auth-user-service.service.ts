import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthResponse, SessionState, StorageService } from '@shared';

const APP_SESSION_STATE_KEY = 'APP_SESSION_STATE';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private readonly storage = inject(StorageService);
  private readonly _user = signal<AuthResponse | null>(null);
  private readonly _hasSessionToken = signal(this.hasSessionTokenInStorage());

  readonly isAuthenticated = computed(() => !!this.user() || this._hasSessionToken());

  private hasSessionTokenInStorage(): boolean {
    return !!this.storage.getItem<SessionState>(APP_SESSION_STATE_KEY)?.token;
  }

  setUser(user: AuthResponse | null) {
    this._user.set(user);
  }

  setSessionToken(token: string | null): void {
    if (!token) {
      this.storage.setItem<null>(APP_SESSION_STATE_KEY, null);
      this._hasSessionToken.set(false);
      return;
    }

    this.storage.setItem<SessionState>(APP_SESSION_STATE_KEY, { token });
    this._hasSessionToken.set(true);
  }

  clearSession(): void {
    this.setUser(null);
    this.setSessionToken(null);
  }

  user = this._user.asReadonly();
}
