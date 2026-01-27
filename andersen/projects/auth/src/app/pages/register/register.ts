import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, createAuthForm } from '../../models/auth.models';
import { LoaderComponent } from '@ui';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../../app.routes';
import { RegistrationService } from '../../services/registration/registration.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent, MatSnackBarModule, LoaderComponent],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly form = createAuthForm();
  private readonly registrationService = inject(RegistrationService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  readonly loading = signal(false);

  onRegister(data: AuthResponse): void {
    this.loading.set(true);

    this.registrationService
      .registerUser(data)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (response) => {
          const token = response.headers.get('T-Auth');

          if (token) {
            localStorage.setItem('auth_token', token);
          }
          this.snackBar
            .open('Registration successful 🎉', undefined, {
              duration: 4000,
            })
            .afterDismissed()
            .subscribe(() => {
              this.router.navigate([AUTH_ROUTES.LOGIN]);
            });
        },
        error: (err) => {
          const message = err?.error?.error ?? 'Registration failed';
          this.showError(message);
        },
        complete: () => {
          this.loading.set(false);
        },
      });
  }

  private showError(error: string): void {
    this.snackBar.open(`${error} 🛑`, undefined, { duration: 4000 });
  }
}
