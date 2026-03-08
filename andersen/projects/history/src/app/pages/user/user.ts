import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { AuthUserService } from '@shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserHistoryService } from '@history/app/services/user-history-request/user-history.service';
import { HistoryEventRequest } from '@history/app/models/history.models';

import { HistoryList } from '@history/app/components/history-list/history-list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  imports: [AsyncPipe, HistoryList],
  templateUrl: './user.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  readonly user$ = inject(AuthUserService).user$;
  readonly #userHistoryService = inject(UserHistoryService);
  readonly #destroyRef = inject(DestroyRef);
  readonly historyList = signal<HistoryEventRequest[]>([]);

  readonly pageSizeOptions = [5, 10, 15];

  readonly pageIndex = signal(0);
  readonly pageSize = signal(this.pageSizeOptions[0]);
  readonly pageChange = output<PageEvent>();

  readonly total = signal(0);

  ngOnInit(): void {
    this.#getHistory();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);

    this.#getHistory();
  }

  #getHistory(): void {
    this.#userHistoryService
      .getUserHistory({
        page: this.pageIndex() + 1,
        limit: this.pageSize(),
      })
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((response) => {
        this.historyList.set(response.items);
        this.total.set(response.total);

        console.log(response.items);
        console.log(response.total);
      });
  }
}
