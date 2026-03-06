import { LoaderComponent } from '@ui';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { TodoCard } from '../todo-card/todo-card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TodoUpdateService } from '../services/todo-service/todo-update.service';
import { finalize } from 'rxjs';
import { Todo } from '../models/models';
import { EventBusService, HEADER_EVENTS } from '@shared';

@Component({
  selector: 'app-todo-page',
  imports: [TodoCard, LoaderComponent],
  templateUrl: './todo-page.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoPageComponent implements OnInit, OnDestroy {
  private readonly todoUpdateService = inject(TodoUpdateService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly eventBusService = inject(EventBusService);
  readonly loader = signal(false);
  readonly todosList = signal<Todo[]>([]);
  readonly taskLoadingTodoId = signal<string | null>(null);
  readonly confirmedTaskUpdate = signal<{ todoId: string; taskId: string; token: number } | null>(
    null,
  );
  readonly syncTodos = effect(() => {
    this.todosList.set(this.todoUpdateService.todos());
  });

  ngOnInit(): void {
    this.eventBusService.appEvent(HEADER_EVENTS.SHOW_TODO_INPUT, null);
    this.todoUpdateService
      .getTodoList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (todos) => {
          this.todosList.set(todos);
        },
        error: () => {
          this.loader.set(false);
        },
      });
  }

  ngOnDestroy(): void {
    this.eventBusService.appEvent(HEADER_EVENTS.CLEAR_HEADER, null);
  }

  deleteTodo(id: string): void {
    this.todoUpdateService
      .removeTodo(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loader.set(false)),
      )
      .subscribe({
        next: (todos) => {
          this.todosList.set(todos);
        },
      });
  }

  addSubtask(event: { todoId: string; name: string }): void {
    const { todoId, name } = event;
    this.taskLoadingTodoId.set(todoId);
    this.todoUpdateService
      .addSubtask(todoId, name)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.taskLoadingTodoId.set(null);
        }),
      )
      .subscribe({
        next: (todos) => {
          this.todosList.set(todos);
        },
      });
  }

  updateSubtask(event: {
    todoId: string;
    taskId: string;
    payload: { name?: string; completed?: boolean };
  }): void {
    const { todoId, taskId, payload } = event;
    this.taskLoadingTodoId.set(todoId);
    this.todoUpdateService
      .updateTask(todoId, taskId, payload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.taskLoadingTodoId.set(null);
        }),
      )
      .subscribe({
        next: (todos) => {
          this.todosList.set(todos);
          this.confirmedTaskUpdate.set({ todoId, taskId, token: Date.now() });
        },
      });
  }

  deleteSubtask(event: { todoId: string; taskId: string }): void {
    const { todoId, taskId } = event;
    this.taskLoadingTodoId.set(todoId);
    this.todoUpdateService
      .deleteSubTask(todoId, taskId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.taskLoadingTodoId.set(null);
        }),
      )
      .subscribe({
        next: (todos) => {
          this.todosList.set(todos);
        },
      });
  }
}
