import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { AUTH_ROUTES, AuthResponse, createAuthForm } from '../../models/auth.models';
import { LoaderComponent } from '@ui';

import { finalize, switchMap, tap } from 'rxjs';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service/auth.service';
import { NavigationPathService, ResponseMessageService } from '@shared';

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
  private readonly navigationPath = inject(NavigationPathService);

  onRegister(data: AuthResponse): void {
    this.loading.set(true);

    this.registrationService
      .registerUser(data)
      .pipe(
        switchMap(() =>
          this.responseMessage.success({
            message: 'Registration successful 🎉',
          }),
        ),
        tap(() => this.navigationPath.navigateToAuth(AUTH_ROUTES.LOGIN)),

        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({});
  }
}
