import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './auth.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  form = input.required<FormGroup>();

  showRessetButton = input<boolean>(false);
  ressetText = input<string | null>(null);

  title = input.required<string>();
  submitText = input.required<string>();
  loading = input<boolean>(false);

  readonly submitForm = output<{
    email: string;
    password: string;
    action: 'submit' | 'reset';
  }>();

  onSubmit(): void {
    if (this.form().valid && !this.loading()) {
      this.submitForm.emit({ ...this.form().getRawValue(), action: 'submit' });
    } else {
      this.form().markAllAsTouched();
    }
  }

  onReset(): void {
    const email = this.form().get('email')?.value;
    const password = this.form().get('password')?.value;

    if (email && password && !this.loading()) {
      this.submitForm.emit({ email, password, action: 'reset' });
    } else {
      this.form().markAllAsTouched();
    }
  }
}
