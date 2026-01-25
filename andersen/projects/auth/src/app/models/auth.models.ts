import { FormControl, FormGroup, Validators } from '@angular/forms';

export type AuthFormModel = {
  email: FormControl<string>;
  password: FormControl<string>;
};

export type AuthResponse = {
  email: string;
  password: string;
};

export const createAuthForm = (): FormGroup<AuthFormModel> =>
  new FormGroup<AuthFormModel>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
