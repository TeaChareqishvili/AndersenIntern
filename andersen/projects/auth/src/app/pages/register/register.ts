import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthComponent } from '../../form/auth';
import { createAuthForm } from '../../models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly form = createAuthForm();
  onRegister(data: { email: string; password: string }) {
    alert(`Registration successful \n\n Email: ${data.email}\n\nPassword: ${data.password}`);
  }
}
