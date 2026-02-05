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
  form = input.required<FormGroup>();

  showRessetButton = input<boolean>(false);
  ressetText = input<string | null>(null);

  title = input.required<string>();
  submitText = input.required<string>();
  loading = input<boolean>(false);

  readonly submitUser = output<{ email: string; password: string }>();
  readonly submitReset = output<{ email: string; password: string }>();

  onSubmit(): void {
    if (this.form().valid && !this.loading()) {
      this.submitUser.emit({ ...this.form().getRawValue() });
    } else {
      this.form().markAllAsTouched();
    }
  }

  onReset(): void {
    const resetPass = this.form().getRawValue();

    if (resetPass && !this.loading()) {
      this.submitReset.emit(resetPass);
    } else {
      this.form().markAllAsTouched();
    }
  }
}
