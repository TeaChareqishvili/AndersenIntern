import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { createAuthForm } from '../../models/auth.models';
import { LoaderComponent } from '@ui';
import { finalize, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service/auth.service';
import { AuthResponse, ResponseMessageService } from '@shared';

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

  readonly #responseMessage = inject(ResponseMessageService);
  readonly #registrationService = inject(AuthService);
  readonly #destroyRef = inject(DestroyRef);

  onRegister(data: AuthResponse): void {
    this.loading.set(true);

    this.#registrationService
      .registerUser(data)
      .pipe(
        switchMap(() =>
          this.#responseMessage.success({
            message: 'Registration successful 🎉',
          }),
        ),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe({});
  }
}
