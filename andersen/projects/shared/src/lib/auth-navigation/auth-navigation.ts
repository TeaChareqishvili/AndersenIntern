import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { AUTH_ROUTES } from '../models/session.models';
import { StorageService } from '../services/storage-service/storage-service.service';
import { AuthUserService } from '../services/auth-user-service/auth-user-service.service';
import { NavigationPathService } from '../services/navigation-path/navigation-path.service';

const APP_SESSION_STATE_KEY = 'APP_SESSION_STATE';

@Component({
  selector: 'lib-auth-navigation',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './auth-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthNavigation {
  private readonly storage = inject(StorageService);
  private readonly authUserService = inject(AuthUserService);
  private readonly authPath = inject(NavigationPathService);

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
    this.storage.setItem<null>(APP_SESSION_STATE_KEY, null);
    this.authUserService.setUser(null);
    this.authPath.navigateToAuth(AUTH_ROUTES.LOGIN);
    this.loading.set(false);
  }
}
