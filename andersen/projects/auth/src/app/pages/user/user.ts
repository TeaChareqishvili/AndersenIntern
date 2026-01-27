import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth-service.service';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {
  private authService = inject(AuthService);

  user = this.authService.user;
}
