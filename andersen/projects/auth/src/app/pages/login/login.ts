import { ChangeDetectionStrategy, Component, inject, DestroyRef, signal } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, createAuthForm } from '../../models/auth.models';

import { finalize, switchMap, tap } from 'rxjs';
import { LoaderComponent } from '@ui';

import { AuthUserService } from '@shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../services/auth-service/auth.service';
import { ResponseMessageService } from '@shared';
import { NavigationPathService } from '../../services/navigation-path/navigation-path.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, LoaderComponent],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly responseMessage = inject(ResponseMessageService);
  private readonly navigationPath = inject(NavigationPathService);

  private readonly authUser = inject(AuthUserService);
  private readonly destroyRef = inject(DestroyRef);
  readonly form = createAuthForm();
  readonly loading = signal(false);

  onLogin(data: AuthResponse): void {
    this.loading.set(true);

    this.authService
      .signInUser(data)
      .pipe(
        switchMap((user: AuthResponse) =>
          this.responseMessage.success({
            message: `Welcome ${user?.email} 🎉`,
          }),
        ),
        tap(() => this.navigationPath.navigateToTodo()),

        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.authUser?.setUser(data));
  }

  onResetPassword(data: AuthResponse): void {
    this.loading.set(true);

    this.authService
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
      });
  }
}
