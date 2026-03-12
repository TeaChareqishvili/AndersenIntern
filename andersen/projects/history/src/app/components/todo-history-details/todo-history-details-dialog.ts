import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { TodoHistoryDialogData } from '@history/app/models/history.models';

@Component({
  selector: 'app-todo-history-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatListModule],
  templateUrl: './todo-history-details-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoHistoryDetailsDialog {
  readonly data = inject<TodoHistoryDialogData>(MAT_DIALOG_DATA);

  getTaskStatus(completed: boolean): string {
    return completed ? 'Completed' : 'Pending';
  }
}
