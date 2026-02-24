import { Injectable, signal } from '@angular/core';
import { AuthUser } from '../../models/session.models';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private readonly _user = signal<AuthUser | null>(null);

  setUser(user: AuthUser | null): void {
    this._user.set(user);
  }

  readonly user = this._user.asReadonly();
}
