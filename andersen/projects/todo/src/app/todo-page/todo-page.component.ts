import { LoaderComponent } from '@ui';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { TodoInput } from '../todo-input/todo-input';
import { TodoCard } from '../todo-card/todo-card';
import { RequestServiceTodo } from '../services/request-service/request-service.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoUpdateService } from '../services/todo-service/todo-update.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-todo-page',
  imports: [TodoInput, TodoCard, LoaderComponent],
  templateUrl: './todo-page.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent implements OnInit {
  private readonly todoRequest = inject(RequestServiceTodo);
  private readonly todoUpdateService = inject(TodoUpdateService);
  private readonly destroyRef = inject(DestroyRef);

  readonly todosList = this.todoUpdateService.todos;
  readonly loader = signal(false);

  ngOnInit(): void {
    this.loader.set(true);
    this.todoRequest
      .getTodos()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loader.set(false)),
      )
      .subscribe({
        next: (todos) => {
          this.todoUpdateService.setTodos(todos);
        },
      });
  }
}
