import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, this.passwordValidator]],
  });

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const errors: ValidationErrors = {};

    if (value.length < 8) {
      errors['minLength'] = { error: 'Password must be at least 8 characters long' };
    }

    const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
    if (uppercaseCount < 2) {
      errors['uppercase'] = { error: 'Password must contain at least two uppercase letters' };
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors['specialChar'] = { error: 'Password must contain at least one special character' };
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  getEmailError(): string {
    const emailControl = this.registerForm.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (emailControl?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  getPasswordErrors(): string[] {
    const passwordControl = this.registerForm.get('password');
    if (!passwordControl?.errors) {
      return [];
    }

    const errors: string[] = [];
    const passwordErrors = passwordControl.errors;

    if (passwordErrors['minLength']) {
      errors.push(passwordErrors['minLength'].error);
    }
    if (passwordErrors['uppercase']) {
      errors.push(passwordErrors['uppercase'].error);
    }
    if (passwordErrors['specialChar']) {
      errors.push(passwordErrors['specialChar'].error);
    }
    if (passwordControl.hasError('required')) {
      errors.push('Password is required');
    }

    return errors;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const message = `Registration Successful!\n\nEmail: ${formData.email}\nPassword: ${formData.password}`;
      alert(message);
      console.log('Form submitted:', formData);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
