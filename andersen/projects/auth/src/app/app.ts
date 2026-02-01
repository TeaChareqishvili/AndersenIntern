import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent } from '@ui';
import { AUTH_ROUTES } from './app.routes';
import { AuthUserService } from './services/auth-user-service/auth-user-service.service';
import { finalize } from 'rxjs/internal/operators/finalize';

import { AuthService } from './services/auth-service/auth.service';
import { ResponseMessageService } from './services/response-message/response-message.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatButtonModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('auth');
  private readonly authUserService = inject(AuthUserService);
  private readonly router = inject(Router);
  private readonly signOutService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly responseMessage = inject(ResponseMessageService);

  readonly loading = signal(false);

  user = this.authUserService.user;

  navigateToSignUp(): void {
    this.router.navigate([AUTH_ROUTES.REGISTER]);
  }

  navigateToSignIn(): void {
    this.router.navigate([AUTH_ROUTES.LOGIN]);
  }

  onLogout(): void {
    this.loading.set(true);

    this.signOutService
      .signOut()
      .pipe(
        tap(() => {
          this.authUserService.setUser(null);
        }),

        switchMap(() =>
          this.responseMessage.success({
            message: 'Logged out successfully 👋',
            navigateTo: AUTH_ROUTES.LOGIN,
          }),
        ),

        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({});
  }
}
