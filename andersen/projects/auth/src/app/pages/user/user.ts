import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthUserService } from '../../services/auth-user-service/auth-user-service.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private authService = inject(AuthUserService);

  user = this.authService.user;
}
