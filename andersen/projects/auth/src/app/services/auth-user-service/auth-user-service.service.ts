import { Injectable, signal } from '@angular/core';
import { AuthResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private readonly _user = signal<AuthResponse | null>(null);

  setUser(user: AuthResponse | null) {
    this._user.set(user);
  }
  user = this._user.asReadonly();
}
