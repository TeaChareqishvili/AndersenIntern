import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { TodoHistoryEventPayload } from '@shared';
import { PaginatorComponent } from '../paginator/paginator';
import { EventDropDownComponent } from '../event-drop-down/event-drop-down';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

function createHistoryPaginatorIntl(): MatPaginatorIntl {
  const intl = new MatPaginatorIntl();
  const translate = inject(TranslateService);
  const destroyRef = inject(DestroyRef);
  const setTranslatedLabels = () => {
    intl.itemsPerPageLabel = translate.instant('history.itemsPerPage');
    intl.changes.next();
  };
  setTranslatedLabels();
  intl.nextPageLabel = '';
  intl.previousPageLabel = '';
  intl.firstPageLabel = '';
  intl.lastPageLabel = '';

  translate.onLangChange.pipe(takeUntilDestroyed(destroyRef)).subscribe(() => {
    setTranslatedLabels();
  });

  return intl;
}

@Component({
  selector: 'app-history-list',
  imports: [
    DatePipe,
    MatTableModule,
    MatSortModule,
    PaginatorComponent,
    EventDropDownComponent,
    TranslatePipe,
  ],
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
  readonly historyList = input<TodoHistoryEventPayload[]>([]);
  readonly pageSize = input<number>(2);
  readonly pageSizeOptions = input<number[]>([5, 10, 15]);
  readonly total = input<number>(0);
  readonly pageIndex = input<number>(0);
  readonly pageChange = output<PageEvent>();
  readonly openTodo = output<TodoHistoryEventPayload>();
  readonly onSortChange = output<Sort>();
  readonly eventFilterChange = output<string | null>();

  displayedColumns = ['N', 'event', 'date'];

  openTodoDetails(history: TodoHistoryEventPayload) {
    this.openTodo.emit(history);
  }

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }

  onEventFilterChange(event: string | null): void {
    this.eventFilterChange.emit(event);
  }
}
