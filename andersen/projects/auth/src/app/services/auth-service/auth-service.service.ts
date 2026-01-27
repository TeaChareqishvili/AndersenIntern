import { Injectable, signal } from '@angular/core';
import { AuthResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _user = signal<AuthResponse | null>(null);

  setUser(user: AuthResponse) {
    this._user.set(user);
  }

  clearUser() {
    this._user.set(null);
  }

  user = this._user.asReadonly();
}
