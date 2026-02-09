import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Form } from '../form/form';
import { createTodoGroup } from '../models/models';

import { TodoService } from '../services/todo-service.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [Form, ReactiveFormsModule],
  templateUrl: './todo-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInput {
  form = createTodoGroup();
  private readonly todo = inject(TodoService);

  onAddTodo(): void {
    if (this.form.valid) {
      this.todo.addTodo(this.form.value.title!);
      this.form.reset();
    }
  }
}
