import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize, switchMap, tap } from 'rxjs';
import { AUTH_ROUTES } from '../models/session.models';
import { ResponseMessageService } from '../services/response-message/response-message.service';
import { AuthUserService } from '../services/auth-user-service/auth-user-service.service';
import { AuthService } from '../../../../auth/src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-auth-navigation',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './auth-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthNavigationComponent {
  private readonly authUserService = inject(AuthUserService);
  private readonly authService = inject(AuthService);
  private readonly responseMessage = inject(ResponseMessageService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(false);
  readonly user = this.authUserService.user;

  readonly logEffect = effect(() => {
    console.log('HEADER USER:', this.user());
  });

  navigateToSignIn(): void {
    this.router.navigateByUrl(this.resolveAuthPath(AUTH_ROUTES.LOGIN));
  }

  navigateToSignUp(): void {
    this.router.navigateByUrl(this.resolveAuthPath(AUTH_ROUTES.REGISTER));
  }

  onLogout(): void {
    this.loading.set(true);

    this.authService
      .signOut()
      .pipe(
        tap(() => this.authUserService.setUser(null)),
        switchMap(() =>
          this.responseMessage.success({
            message: 'Logged out successfully',
            navigateTo: this.resolveAuthPath(AUTH_ROUTES.LOGIN),
          }),
        ),
        finalize(() => this.loading.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({});
  }

  private resolveAuthPath(route: AUTH_ROUTES): string {
    const hostedInShell = this.router.url.startsWith('/auth') || this.router.url === '/';
    return hostedInShell ? `/auth/${route}` : `/${route}`;
  }
}
