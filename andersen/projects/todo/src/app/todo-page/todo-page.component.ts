import { Component, inject } from '@angular/core';
import { TodoInput } from '../todo-input/todo-input';
import { TodoCard } from '../todo-card/todo-card';
import { TodoService } from '../services/storage-service.service';

@Component({
  selector: 'app-todo-page',
  imports: [TodoInput, TodoCard],
  templateUrl: './todo-page.component.html',
  styleUrl: './todo-page.component.scss',
})
export class TodoPageComponent {
  readonly todoService = inject(TodoService);

  readonly todos = this.todoService.todos;
}
