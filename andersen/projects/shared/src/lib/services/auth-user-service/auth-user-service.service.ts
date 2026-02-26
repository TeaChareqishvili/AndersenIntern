import {inject, Injectable, OnDestroy, OnInit, signal} from '@angular/core';
import { AuthResponse } from '@auth/app/models/auth.models';
import { StorageService } from '../storage-service/storage-service.service';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthUserService implements OnDestroy{
  private readonly _user$ = new BehaviorSubject<AuthResponse | null>(null);
  readonly #storageService = inject(StorageService);
  readonly #USER_KEY = 'USER';

  ngOnDestroy(): void {
    this._user$.complete()
  }

  set user(user: AuthResponse | null) {
    this.#storageService.setItem(this.#USER_KEY, JSON.stringify(user));
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
