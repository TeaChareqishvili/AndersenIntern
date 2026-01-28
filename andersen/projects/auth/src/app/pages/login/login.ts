import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, BackendError, createAuthForm } from '../../models/auth.models';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { LoaderComponent } from '@ui';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../../app.routes';
import { AuthUserService } from '../../services/auth-user-service/auth-user-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, LoaderComponent, MatSnackBarModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly form = createAuthForm();
  readonly loading = signal(false);

  private readonly authUser = inject(AuthService);

  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthUserService);
  private readonly destroyRef = inject(DestroyRef);

  private showSuccess(user: string) {
    return this.snackBar.open(`Welcome ${user} 🎉`, undefined, { duration: 4000 });
  }

  private showError(error: string): void {
    this.snackBar.open(`${error} 🛑`, undefined, { duration: 4000 });
  }

  onLogin(data: { email: string; password: string }): void {
    this.loading.set(true);

    this.authUser
      .signInUser(data)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )

      .subscribe({
        next: (user: AuthResponse) => {
          this.authService.setUser(user);

          const snackRef = this.showSuccess(user?.email || 'Login successful');

          snackRef
            .afterDismissed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.router.navigate([AUTH_ROUTES.USER]);
            });
        },

        error: (err: HttpErrorResponse) => {
          const backendError = err.error as BackendError;
          const message = backendError.error;

          this.showError(message);
        },
      });
  }

  onResetPassword(data: { email: string; password: string }): void {
    this.loading.set(true);

    this.authUser
      .ressetPassword(data)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Password reset link sent to your email 📩', undefined, {
            duration: 4000,
          });
        },
        error: (err: HttpErrorResponse) => {
          const backendError = err.error as BackendError;
          this.showError(backendError.error ?? 'Reset password failed');
        },
      });
  }
}
