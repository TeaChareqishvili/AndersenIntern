import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TODO_HISTORY_EVENTS, TodoHistoryEventService } from '@shared';
import { filter, take } from 'rxjs';
import { Todo } from '../../models/models';
import {
  TodoHistoryDetailsDialog,
  TodoHistoryDialogData,
} from '../../todo-history-details/todo-history-details-dialog';
import { TodoUpdateService } from '../todo-service/todo-update.service';

@Injectable({
  providedIn: 'root',
})
export class TodoHistoryDialogBridgeService {
  readonly #todoHistoryEventService = inject(TodoHistoryEventService);
  readonly #todoUpdateService = inject(TodoUpdateService);
  readonly #dialog = inject(MatDialog);
  readonly #destroyRef = inject(DestroyRef);
  #initialized = false;
  #dialogRef: MatDialogRef<TodoHistoryDetailsDialog> | null = null;

  init(): void {
    if (this.#initialized) {
      return;
    }
    this.#initialized = true;

    this.#todoHistoryEventService.historyEvents$
      .pipe(
        filter((payload) => payload.event === TODO_HISTORY_EVENTS.VIEW_TODO_DETAILS),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe(({ todo_id }) => {
        this.#openTodoDetailsDialog(todo_id);
      });
  }

  #openTodoDetailsDialog(todoId: string): void {
    const selectedTodo = this.#todoUpdateService.todos().find((todo) => todo.id === todoId);
    if (selectedTodo) {
      this.#showDialog(selectedTodo, todoId);
      return;
    }

    this.#todoUpdateService
      .getTodoList()
      .pipe(take(1))
      .subscribe((todos) => {
        const loadedTodo = todos.find((todo) => todo.id === todoId);
        if (!loadedTodo) {
          this.#showDialog(null, todoId);
          return;
        }

        this.#showDialog(loadedTodo, todoId);
      });
  }

  #showDialog(todo: Todo | null, todoId: string): void {
    this.#dialogRef?.close();
    this.#dialogRef = this.#dialog.open(TodoHistoryDetailsDialog, {
      data: {
        todo,
        todoId,
      } satisfies TodoHistoryDialogData,
      width: '560px',
      maxWidth: '95vw',
    });
  }
}
