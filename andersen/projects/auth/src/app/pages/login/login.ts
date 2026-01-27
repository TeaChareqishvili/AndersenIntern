import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, createAuthForm } from '../../models/auth.models';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { LoaderComponent } from '@ui';
import { RessetPasswordService } from '../../services/resset-password/resset-password.service';
import { SignInService } from '../../services/sign-in /sign-in.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../../app.routes';
import { AuthService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, LoaderComponent, MatSnackBarModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly form = createAuthForm();

  private readonly signInService = inject(SignInService);
  private readonly resetPasswordService = inject(RessetPasswordService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  readonly loading = signal(false);

  private showSuccess(user: string) {
    return this.snackBar.open(`Welcome ${user} 🎉`, undefined, { duration: 4000 });
  }

  onFormSubmit(data: { email: string; password: string; action: 'submit' | 'reset' }): void {
    if (data.action === 'submit') {
      this.onLogin(data);
    } else {
      this.onResetPassword(data);
    }
  }

  private onLogin(data: AuthResponse): void {
    this.loading.set(true);

    this.signInService
      .signInUser(data)
      .pipe(finalize(() => this.loading.set(false)))

      .subscribe({
        next: (response: HttpResponse<AuthResponse>) => {
          const user = response?.body;

          if (user) {
            this.authService.setUser(user);
          }

          const snackRef = this.showSuccess(user?.email || 'Login successful');

          snackRef.afterDismissed().subscribe(() => {
            this.router.navigate([AUTH_ROUTES.USER]);
          });
        },

        error: (err) => {
          const message = err?.error?.error;
          this.showError(message);
        },
      });
  }

  private onResetPassword(data: AuthResponse): void {
    this.loading.set(true);

    this.resetPasswordService
      .ressetPassword(data)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.snackBar.open('Password reset link sent to your email 📩', undefined, {
            duration: 4000,
          });
        },
        error: (err) => {
          this.showError(err?.error?.error ?? 'Reset password failed');
        },
      });
  }

  private showError(error: string) {
    this.snackBar.open(`${error} 🛑`, undefined, { duration: 4000 });
  }
}
