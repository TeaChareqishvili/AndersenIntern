import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthUserService } from '@shared';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private readonly authUserService = inject(AuthUserService);

  readonly isAuthenticated = this.authUserService.isAuthenticated;

  readonly user = this.authUserService.user;
}
