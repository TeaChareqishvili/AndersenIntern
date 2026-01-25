import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, createAuthForm } from '../../models/auth.models';
import { RegistrationService } from '../../services/registration/registration';
import { MatSnackBar } from '@angular/material/snack-bar';
import { exhaustMap, finalize, Subject } from 'rxjs';
import { LoaderComponent } from '@ui';
import { Router } from '@angular/router';
import { AUTH_ROUTES } from '../../app.routes';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent, MatSnackBarModule, LoaderComponent],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  readonly form = createAuthForm();
  private registrationService = inject(RegistrationService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  readonly loading = signal(false);

  // T-auth was not visible in headers.

  // readonly token = localStorage.getItem('auth_token');

  private submit$ = new Subject<AuthResponse>();

  private showSuccess() {
    return this.snackBar.open('Registration successful 🎉', undefined, { duration: 4000 });
  }

  private showError(error: string) {
    this.snackBar.open(` ${error}  🛑`, undefined, { duration: 4000 });
  }

  ngOnInit(): void {
    this.submit$
      .pipe(
        exhaustMap((data) => {
          this.loading.set(true);

          return this.registrationService
            .registerUser(data)
            .pipe(finalize(() => this.loading.set(false)));
        }),
      )
      .subscribe({
        next: (response: unknown) => {
          // const token = response.headers.get('T-Auth');

          // if (token) {
          //   localStorage.setItem('auth_token', token);
          // }

          const snackRef = this.showSuccess();
          snackRef.afterDismissed().subscribe(() => {
            this.router.navigate([AUTH_ROUTES.LOGIN]);
          });
        },
        error: (err) => {
          const message = err?.error?.error;
          this.showError(message);
        },
      });
  }

  onRegister(data: AuthResponse): void {
    this.submit$.next(data);
  }
}
