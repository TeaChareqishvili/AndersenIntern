import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Form } from '../form/form';
import { createTodoForm } from '../models/models';
import { TodoService } from '../services/storage-service.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [Form, ReactiveFormsModule],
  templateUrl: './todo-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInput {
  form = createTodoForm();
  private readonly todo = inject(TodoService);

  onAddTodo(title: string): void {
    this.todo.addTodo(title);
  }
}
