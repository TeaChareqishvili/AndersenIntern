import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthComponent } from '../../form/auth';
import { createAuthForm } from '../../models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  form = createAuthForm();
  onRegister(data: { email: string; password: string }) {
    alert(`Registration successful \n\n Email: ${data.email}\n\nPassword: ${data.password}`);
    console.log('REGISTER', data);
  }
}
