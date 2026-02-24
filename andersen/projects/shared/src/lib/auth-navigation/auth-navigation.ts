import { ChangeDetectionStrategy, Component, inject, signal, DestroyRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AUTH_ROUTES } from '../models/session.models';

import { AuthUserService } from '../services/auth-user-service/auth-user-service.service';
import { NavigationPathService } from '../services/navigation-path/navigation-path.service';
import { finalize, switchMap, tap } from 'rxjs';
import { LogOutServiceService } from '../services/user-log-out/log-out-service.service';
import { ResponseMessageService } from '../services/response-message/response-message.service';

@Component({
  selector: 'lib-auth-navigation',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './auth-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthNavigation {
  private readonly signOutService = inject(LogOutServiceService);
  private readonly authUserService = inject(AuthUserService);
  private readonly authPath = inject(NavigationPathService);
  private readonly responseMessage = inject(ResponseMessageService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly user = this.authUserService.user;

  navigateToSignUp(): void {
    this.authPath.navigateToAuth(AUTH_ROUTES.REGISTER);
  }

  navigateToSignIn(): void {
    this.authPath.navigateToAuth(AUTH_ROUTES.LOGIN);
  }

  navigateToTodo(): void {
    this.authPath.navigateToTodo();
  }

  navigateToUser(): void {
    this.authPath.navigateToAuth(AUTH_ROUTES.USER);
  }

  onLogout(): void {
    this.loading.set(true);

    this.signOutService
      .signOut()
      .pipe(
        tap(() => {
          this.authUserService.setUser(null);
          this.authPath.navigateToAuth(AUTH_ROUTES.LOGIN);
        }),

        switchMap(() =>
          this.responseMessage.success({
            message: 'Logged out successfully 👋',
          }),
        ),

        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({});
  }
}
