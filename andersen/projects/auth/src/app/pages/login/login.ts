import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { createAuthForm } from '../../models/auth.models';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  form = createAuthForm();
  onLogin(data: { email: string; password: string }) {
    alert(`Log In  successful \n\n Email: ${data.email}\n\nPassword: ${data.password}`);
    console.log('LOGIN', data);
  }
}
