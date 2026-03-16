import { ChangeDetectionStrategy, Component, inject, DestroyRef } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { createAuthForm } from '../../models/auth.models';
import { LoaderComponent } from '@ui';
import { switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service/auth.service';
import { AuthResponse, LoadingService, ResponseMessageService } from '@shared';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent, LoaderComponent],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly form = createAuthForm();
  readonly loading = inject(LoadingService).isLoading;

  readonly #responseMessage = inject(ResponseMessageService);
  readonly #registrationService = inject(AuthService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #translate = inject(TranslateService);

  onRegister(data: AuthResponse): void {
    this.#registrationService
      .registerUser(data)
      .pipe(
        switchMap(() =>
          this.#responseMessage.success({
            message: this.#translate.instant('auth.registrationSuccess'),
          }),
        ),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe({});
  }
}
