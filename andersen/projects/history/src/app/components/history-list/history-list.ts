import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HistoryEventRequest } from '@history/app/services/user-history-request/user-history.service';
import { TodoHistoryEventService } from '@shared';

@Component({
  selector: 'app-history-list',
  imports: [MatListModule, MatPaginatorModule, DatePipe],
  templateUrl: './history-list.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryList {
  readonly #todoHistoryEventService = inject(TodoHistoryEventService);
  readonly historyList = input<HistoryEventRequest[]>([]);

  readonly historyItems = computed(() => this.#HistoryItemLabels());

  readonly pageSizeOptions = [2, 5, 10];
  readonly pageSize = signal(this.pageSizeOptions[0]);
  readonly pagedHistoryItems = computed(() => this.historyItems().slice(0, this.pageSize()));

  onPageChange(event: PageEvent): void {
    this.pageSize.set(event.pageSize);
  }

  #HistoryItemLabels() {
    return this.historyList().map((item) => ({
      ...item,
      label: this.#todoHistoryEventService.getEventLabel(item.event),
    }));
  }
}
