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
  private readonly authService = inject(AuthUserService);

  user = this.authService.user;
}
