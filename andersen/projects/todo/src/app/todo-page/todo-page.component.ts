import { Component, inject } from '@angular/core';
import { TodoInput } from '../todo-input/todo-input';
import { TodoCard } from '../todo-card/todo-card';

import { TodoService } from '../services/todo-service.service';

@Component({
  selector: 'app-todo-page',
  imports: [TodoInput, TodoCard],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
})
export class TodoPageComponent {
  private readonly todo = inject(TodoService);

  readonly todos = this.todo.todos;
}
