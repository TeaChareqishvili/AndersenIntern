import { inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthUserService } from '../auth-user-service/auth-user-service.service';
import { LogOutService } from '../user-log-out/log-out-service.service';

export enum IN_GOING_EVENTS {
  LOGIN_SUCCESS = 'login-success',
  LOGOUT_SUCCESS = 'logout-success',
}

export enum OUT_GOING_EVENTS {
  TO_SIGN_IN = 'navigate-to-sign-in',
  TO_SIGN_UP = 'navigate-to-sign-up',
  TO_USER = 'navigate-to-user',
  TO_TODO = 'navigate-to-todo',
  LOGOUT = 'on-logout',
}

@Injectable({
  providedIn: 'root',
})
export class EventBusService implements OnDestroy {
  readonly inGoingEvents$ = new BehaviorSubject<string>('');
  readonly outGoingEvents$ = new BehaviorSubject<string>('');
  readonly #eventData$ = new BehaviorSubject<any>(null);

  readonly #authUserService = inject(AuthUserService);
  readonly #logOutService = inject(LogOutService);

  shellEvent(event: OUT_GOING_EVENTS | string): void {
    // debugger;
    this.outGoingEvents$.next(event);
  }

  appEvent<T>(event: string, data: T): void {
    // debugger;
    this.#eventData$.next(data);
    this.inGoingEvents$.next(event);
  }

  ngOnDestroy(): void {
    this.inGoingEvents$.complete();
    this.outGoingEvents$.complete();
  }

  listen(): void {
    this.inGoingEvents$.subscribe((e) => {
      // debugger
      switch (e) {
        case IN_GOING_EVENTS.LOGIN_SUCCESS:
          this.#authUserService.user = this.#eventData$.value;
          break;
        default:
          break;
      }
    });

    this.outGoingEvents$.subscribe((e) => {
      switch (e) {
        case OUT_GOING_EVENTS.LOGOUT:
          this.#logOutService.signOut().subscribe({
            complete: () => {
              this.#authUserService.user = null;
              this.inGoingEvents$.next(IN_GOING_EVENTS.LOGOUT_SUCCESS);
            },
          });
          break;
        default:
          break;
      }
    });
  }
}
