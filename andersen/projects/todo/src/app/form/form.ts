import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Todo } from '../models/models';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  readonly form = input.required<FormGroup>();
  readonly buttonText = input<string>();
  readonly placeholder = input<string>('Enter value');
  readonly todoSubmitted = output<Todo>();

  onSubmit(): void {
    const form = this.form();

    if (form.valid) {
      this.todoSubmitted.emit(form.value);
      form.reset();
    }
  }
}
