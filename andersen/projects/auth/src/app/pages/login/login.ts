import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, BackendError, createAuthForm } from '../../models/auth.models';

import { catchError, EMPTY, finalize, switchMap, tap } from 'rxjs';
import { LoaderComponent } from '@ui';

import { HttpErrorResponse } from '@angular/common/http';

import { AUTH_ROUTES } from '../../app.routes';
import { AuthUserService } from '../../services/auth-user-service/auth-user-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service/auth.service';
import { ResponseMessageService } from '../../services/response-message/response-message.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, LoaderComponent],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly form = createAuthForm();
  readonly loading = signal(false);

  private readonly authUser = inject(AuthService);
  private readonly responseMessage = inject(ResponseMessageService);

  private readonly authService = inject(AuthUserService);
  private readonly destroyRef = inject(DestroyRef);

  onLogin(data: AuthResponse): void {
    this.loading.set(true);

    this.authUser
      .signInUser(data)
      .pipe(
        tap((user: AuthResponse) => {
          this.authService.setUser(user);
        }),

        switchMap((user: AuthResponse) =>
          this.responseMessage.success({
            message: `Welcome ${user.email} 🎉`,
            navigateTo: AUTH_ROUTES.USER,
          }),
        ),

        catchError((err: HttpErrorResponse) => {
          const backendError = err.error as BackendError;
          const message = backendError?.error ?? 'Login failed';

          this.responseMessage.error(message);
          return EMPTY;
        }),

        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  onResetPassword(data: AuthResponse): void {
    this.loading.set(true);

    this.authUser
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
        error: (err: HttpErrorResponse) => {
          const backendError = err.error as BackendError;
          this.responseMessage.error(backendError.error ?? 'Reset password failed');
        },
      });
  }
}
