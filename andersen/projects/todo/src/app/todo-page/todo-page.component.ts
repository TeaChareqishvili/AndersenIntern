import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoInput } from '../todo-input/todo-input';
import { TodoCard } from '../todo-card/todo-card';

import { TodoService } from '../services/todo-service.service';

@Component({
  selector: 'app-todo-page',
  imports: [TodoInput, TodoCard],
  templateUrl: './todo-page.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent {
  private readonly todoService = inject(TodoService);

  readonly todos = this.todoService.todos;
}
