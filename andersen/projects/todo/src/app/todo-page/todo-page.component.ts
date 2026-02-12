import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { TodoInput } from '../todo-input/todo-input';
import { TodoCard } from '../todo-card/todo-card';
import { RequestServiceTodo } from '../services/request-service/request-service.service';

@Component({
  selector: 'app-todo-page',
  imports: [TodoInput, TodoCard],
  templateUrl: './todo-page.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent implements OnInit {
  private readonly todoRequest = inject(RequestServiceTodo);

  readonly todosList = this.todoRequest.todos;

  ngOnInit(): void {
    this.todoRequest.getTodos().subscribe({
      next: (todos) => {
        this.todoRequest.setTodos(todos);
      },
    });
  }
}
