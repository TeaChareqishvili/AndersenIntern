import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, BackendError, createAuthForm } from '../../models/auth.models';
import { LoaderComponent } from '@ui';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../../app.routes';
import { finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent, MatSnackBarModule, LoaderComponent],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly form = createAuthForm();
  readonly loading = signal(false);

  private readonly registrationService = inject(AuthService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  onRegister(data: AuthResponse): void {
    this.loading.set(true);

    this.registrationService
      .registerUser(data)
      .pipe(
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.snackBar
            .open('Registration successful 🎉', undefined, {
              duration: 4000,
            })
            .afterDismissed()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.router.navigate([AUTH_ROUTES.LOGIN]);
            });
        },
        error: (err: HttpErrorResponse) => {
          const backendError = err.error as BackendError;
          const message = backendError.error ?? 'Registration failed';
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
