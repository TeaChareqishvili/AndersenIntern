import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { AuthUserService, HEADER_ACTION_NAV_TYPES, HeaderSlotService } from '@shared';

@Component({
  selector: 'lib-auth-navigation',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './auth-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthNavigation {
  private readonly headerAction = inject(HeaderSlotService);
  private readonly authUserService = inject(AuthUserService);

  readonly user = this.authUserService.user;

  navigateToSignUp(): void {
    this.headerAction.emitAction({ type: HEADER_ACTION_NAV_TYPES.REGISTER });
  }

  navigateToSignIn(): void {
    this.headerAction.emitAction({ type: HEADER_ACTION_NAV_TYPES.LOGIN });
  }

  navigateToTodo(): void {
    this.headerAction.emitAction({ type: HEADER_ACTION_NAV_TYPES.TODO });
  }

  navigateToUser(): void {
    this.headerAction.emitAction({ type: HEADER_ACTION_NAV_TYPES.USER });
  }

  onLogout(): void {
    this.headerAction.emitAction({ type: HEADER_ACTION_NAV_TYPES.LOGOUT });
  }
}
