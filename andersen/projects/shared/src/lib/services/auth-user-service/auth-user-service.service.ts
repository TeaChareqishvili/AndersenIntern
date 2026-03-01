import { inject, Injectable, OnDestroy } from '@angular/core';
import { StorageService } from '../storage-service/storage-service.service';
import { BehaviorSubject } from 'rxjs';

export type AuthResponse = {
  email: string;
  password: string;
};
@Injectable({
  providedIn: 'root',
})
export class AuthUserService implements OnDestroy {
  private readonly _user$ = new BehaviorSubject<AuthResponse | null>(null);
  readonly #storageService = inject(StorageService);
  readonly #USER_KEY = 'USER';

  ngOnDestroy(): void {
    this._user$.complete();
  }

  set user(user: AuthResponse | null) {
    this.#storageService.setItem(this.#USER_KEY, user);
    this._user$.next(user);
  }

  get user$() {
    if (!this._user$.value) {
      const userSavedUser = this.#storageService.getItem<AuthResponse>(this.#USER_KEY);
      if (userSavedUser) {
        this._user$.next(userSavedUser);
      }
    }
    return this._user$;
  }
}
