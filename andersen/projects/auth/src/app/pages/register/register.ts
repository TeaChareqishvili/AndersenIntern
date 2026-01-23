import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AuthComponent } from '../../form/auth';
import { createAuthForm, RegistrationData } from '../../models/auth.models';
import { RegistrationService } from '../../services/registration';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [AuthComponent],
  templateUrl: './register.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  readonly form = createAuthForm();
  private registrationService = inject(RegistrationService);

  onRegister(data: RegistrationData): void {
    this.registrationService.registerUser(data).subscribe({
      next: () => {
        alert(`Registration successful!\n\nEmail: ${data.email}`);
      },
      error: (err) => {
        console.error(err);
        alert(` Registration failed. Please try again\n\nEmail: ${data.email}`);
      },
    });
  }
}
