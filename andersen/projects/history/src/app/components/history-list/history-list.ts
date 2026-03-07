import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HistoryEventRequest } from '@history/app/services/user-history-request/user-history.service';

import { TODO_HISTORY_EVENTS, TodoHistoryEventService } from '@shared';

@Component({
  selector: 'app-history-list',
  imports: [MatListModule, MatPaginatorModule],
  templateUrl: './history-list.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryList {
  readonly #todoHistoryEventService = inject(TodoHistoryEventService);
  readonly historyList = input<HistoryEventRequest[]>([]);
  readonly pageSizeOptions = [2, 5, 10];
  readonly pageSize = signal(this.pageSizeOptions[0]);

  readonly historyStatistics = computed(() => {
    const stats = new Map<TODO_HISTORY_EVENTS, number>();

    for (const item of this.historyList()) {
      stats.set(item.event, (stats.get(item.event) ?? 0) + 1);
    }

    return Array.from(stats.entries()).map(([event, count]) => ({
      label: this.#todoHistoryEventService.getEventLabel(event as HistoryEventRequest['event']),
      count,
    }));
  });

  onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
  }
}
