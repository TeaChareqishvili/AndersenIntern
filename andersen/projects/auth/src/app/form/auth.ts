import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
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
  readonly form = input.required<FormGroup>();

  title = input.required<string>();
  submitText = input.required<string>();

  readonly submitForm = output<{
    email: string;
    password: string;
  }>();

  onSubmit(): void {
    if (this.form().valid) {
      this.submitForm.emit(this.form().getRawValue());
    } else {
      this.form().markAllAsTouched();
    }
  }
}
