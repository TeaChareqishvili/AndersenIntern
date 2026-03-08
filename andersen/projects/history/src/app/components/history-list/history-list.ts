import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HistoryEventRequest } from '@history/app/models/history.models';
import { TODO_HISTORY_EVENTS, TodoHistoryEventService } from '@shared';

function createHistoryPaginatorIntl(): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();
  intl.nextPageLabel = '';
  intl.previousPageLabel = '';
  intl.firstPageLabel = '';
  intl.lastPageLabel = '';
  return intl;
}

@Component({
  selector: 'app-history-list',
  imports: [MatListModule, MatPaginatorModule, DatePipe],
  templateUrl: './history-list.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MatPaginatorIntl,
      useFactory: createHistoryPaginatorIntl,
    },
  ],
})
export class HistoryList {
  readonly #todoHistoryEventService = inject(TodoHistoryEventService);
  readonly historyList = input<HistoryEventRequest[]>([]);
  readonly pageSize = input<number>(2);
  readonly pageSizeOptions = input<number[]>([5, 10, 15]);
  readonly total = input<number>(0);
  readonly pageIndex = input<number>(0);
  readonly pageChange = output<PageEvent>();

  openTodoDetails(todoId: string) {
    this.#todoHistoryEventService.emitHistoryEvent({
      event: TODO_HISTORY_EVENTS.VIEW_TODO_DETAILS,
      todo_id: todoId,
    });
  }

  trackHistory(_index: number, item: HistoryEventRequest): string {
    return `${item.todo_id}-${item.date}`;
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
