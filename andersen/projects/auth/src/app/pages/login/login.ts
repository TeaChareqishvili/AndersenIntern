import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, createAuthForm } from '../../models/auth.models';

import { finalize, switchMap, tap } from 'rxjs';
import { LoaderComponent } from '@ui';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service/auth.service';
import { ResponseMessageService } from '@shared';
import {
  EventBusService,
  IN_GOING_EVENTS,
} from '@shared';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, LoaderComponent],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly responseMessage = inject(ResponseMessageService);
  readonly #eventBusService = inject(EventBusService);

  private readonly destroyRef = inject(DestroyRef);
  readonly form = createAuthForm();
  readonly loading = signal(false);

  onLogin(data: AuthResponse): void {
    this.loading.set(true);

    this.authService
      .signInUser(data)
      .pipe(
        switchMap((user: AuthResponse) =>
          this.responseMessage.success({
            message: `Welcome ${user?.email} 🎉`,
          }),
        ),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        debugger
        this.#eventBusService.appEvent<AuthResponse>(IN_GOING_EVENTS.LOGIN_SUCCESS, data);
      });
  }

  onResetPassword(data: AuthResponse): void {
    this.loading.set(true);

    this.authService
      .ressetPassword(data)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.responseMessage.success({
            message: 'Password reset link sent to your email 📩',
          });
        },
      });
  }
}
