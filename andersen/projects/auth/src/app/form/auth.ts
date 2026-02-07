import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  output,
  signal,
  DestroyRef,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PasswordMaskPipe } from '../pipes/password-mask/password-mask.pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    PasswordMaskPipe,
  ],

  templateUrl: './auth.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent implements OnInit {
  hidePassword = true;
  maskSymbol = '😂';

  form = input.required<FormGroup>();

  showRessetButton = input<boolean>(false);
  ressetText = input<string | null>(null);

  title = input.required<string>();
  submitText = input.required<string>();
  loading = input<boolean>(false);

  readonly submitUser = output<{ email: string; password: string }>();
  readonly submitReset = output<{ email: string; password: string }>();

  passwordValue = signal<string | null>(null);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const passwordValue = this.form().get('password');
    if (passwordValue) {
      passwordValue.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
        this.passwordValue.set(value);
      });

      this.passwordValue.set(passwordValue.value);
    }
  }

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

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
