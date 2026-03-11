import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  Todo,
  TodoHistoryDetailsDialog,
  TodoHistoryDialogData,
} from '@history/app/components/todo-history-details/todo-history-details-dialog';
import { TODO_HISTORY_EVENTS, TodoHistoryEventService } from '@shared';

import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoHistoryDialogBridgeService {
  readonly #todoHistoryEventService = inject(TodoHistoryEventService);
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
        this.#showDialog(todo_id);
      });
  }

  #showDialog(todoId: string): void {
    this.#dialogRef?.close();

    this.#dialogRef = this.#dialog.open(TodoHistoryDetailsDialog, {
      data: {
        todo: null,
        todoId,
      } satisfies TodoHistoryDialogData,
      width: '560px',
      maxWidth: '95vw',
    });
  }
}
