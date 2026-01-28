import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, BackendError, createAuthForm } from '../../models/auth.models';
import { LoaderComponent } from '@ui';
import { AUTH_ROUTES } from '../../app.routes';
import { catchError, EMPTY, finalize, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service/auth.service';
import { ResponseMessageService } from '../../services/response-message/response-message.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent, LoaderComponent],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly form = createAuthForm();
  readonly loading = signal(false);

  private readonly responseMessage = inject(ResponseMessageService);
  private readonly registrationService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  onRegister(data: AuthResponse): void {
    this.loading.set(true);

    this.registrationService
      .registerUser(data)
      .pipe(
        switchMap(() =>
          this.responseMessage.success({
            message: 'Registration successful 🎉',
            navigateTo: AUTH_ROUTES.LOGIN,
          }),
        ),
        catchError((err: HttpErrorResponse) => {
          const backendError = err.error as BackendError;
          const message = backendError?.error ?? 'Registration failed';
          this.responseMessage.error(message);

          return EMPTY;
        }),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
