import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  form = input.required<FormGroup>();

  buttonText = input<string>();
  placeholder = input<string>('Enter value');

  todoSubmitted = output<string>();

  onSubmit(): void {
    if (this.form().valid) {
      const todoValue = this.form().get('todo')?.value;
      if (todoValue) {
        this.todoSubmitted.emit(todoValue);
        this.form().reset();
      }
    }
  }
}
