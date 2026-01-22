import { ChangeDetectionStrategy, Component, EventEmitter, Output, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  form = input.required<FormGroup>();

  title = input.required<string>();
  submitText = input.required<string>();

  @Output() submitForm = new EventEmitter<{
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
