import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Form } from '../form/form';
import { createTodoGroup } from '../models/models';

import { RequestServiceTodo } from '../services/request-service/request-service.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [Form, ReactiveFormsModule],
  templateUrl: './todo-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInput {
  private readonly todoService = inject(RequestServiceTodo);
  readonly form = createTodoGroup();

  onAddTodo(): void {
    if (this.form.valid) {
      this.todoService.addTodo(this.form.value.name!).subscribe({
        next: (newTodo) => {
          this.todoService['_todos'].update((todos) => [...todos, newTodo]);
        },
      });
      this.form.reset();
    }
  }
}
