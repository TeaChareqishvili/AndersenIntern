import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Todo } from '../models/models';

export interface TodoHistoryDialogData {
  todo: Todo | null;
  todoId: string;
}

@Component({
  selector: 'app-todo-history-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatListModule],
  templateUrl: './todo-history-details-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoHistoryDetailsDialog {
  readonly data = inject<TodoHistoryDialogData>(MAT_DIALOG_DATA);
}
