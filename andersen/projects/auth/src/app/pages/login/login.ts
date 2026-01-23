import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { createAuthForm } from '../../models/auth.models';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  readonly form = createAuthForm();
  onLogin(data: { email: string; password: string }) {
    alert(`Log In  successful \n\n Email: ${data.email}\n\nPassword: ${data.password}`);
  }
}
