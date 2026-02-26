import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HEADER_ACTION_NAV_TYPES } from '../../models/header-actions.models';
import { AuthUserService } from '../../services/auth-user-service/auth-user-service.service';
import { HeaderSlotService } from '../../services/header-slot/header-service.service';

@Component({
  selector: 'lib-header-navigation',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderNavigation {
  private readonly headerSlot = inject(HeaderSlotService);
  private readonly authUserService = inject(AuthUserService);

  readonly user = this.authUserService.user;

  navigateToSignUp(): void {
    this.headerSlot.emitAction({ type: HEADER_ACTION_NAV_TYPES.REGISTER });
  }

  navigateToSignIn(): void {
    this.headerSlot.emitAction({ type: HEADER_ACTION_NAV_TYPES.LOGIN });
  }

  navigateToTodo(): void {
    this.headerSlot.emitAction({ type: HEADER_ACTION_NAV_TYPES.TODO });
  }

  navigateToUser(): void {
    this.headerSlot.emitAction({ type: HEADER_ACTION_NAV_TYPES.USER });
  }

  onLogout(): void {
    this.headerSlot.emitAction({ type: HEADER_ACTION_NAV_TYPES.LOGOUT });
  }
}
