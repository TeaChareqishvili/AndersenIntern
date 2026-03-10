import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AuthUserService } from '@shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserHistoryService } from '@history/app/services/user-history-request/user-history.service';
import { HistoryEventRequest, HistoryPageResponse } from '@history/app/models/history.models';
import { HistoryList } from '@history/app/components/history-list/history-list';
import { PageEvent } from '@angular/material/paginator';

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
  private isOneBasedPageIndexing = true;
  readonly historyList = signal<HistoryEventRequest[]>([]);
  readonly pageSizeOptions = [5, 10, 15];
  readonly pageIndex = signal(0);
  readonly pageSize = signal(this.pageSizeOptions[0]);
  readonly total = signal(0);

  ngOnInit(): void {
    this.#getHistory();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);

    this.#getHistory();
  }

  #getHistory(allowRetry = true): void {
    const pageIndex = this.pageIndex();
    const pageSize = this.pageSize();

    this.#userHistoryService
      .getUserHistory({
        page: this.#currentRequestPage(),
        limit: pageSize,
      })
      .pipe(takeUntilDestroyed(this.#destroyRef))

      .subscribe((response) => {
        this.#handleHistoryResponse(response, pageIndex, pageSize, allowRetry);
        console.log(response, 'res');
      });
  }

  #handleHistoryResponse(
    response: HistoryPageResponse,
    pageIndex: number,
    pageSize: number,
    allowRetry: boolean,
  ): void {
    if (response.items.length === 0 && pageIndex > 0) {
      const hasMoreItems = this.total() > pageIndex * pageSize;

      if (hasMoreItems && allowRetry) {
        this.isOneBasedPageIndexing = !this.isOneBasedPageIndexing;
        this.#getHistory(false);
        return;
      }

      const prevPage = pageIndex - 1;

      this.pageIndex.set(prevPage);
      this.total.set((prevPage + 1) * pageSize);

      this.#getHistory();
      return;
    }

    this.historyList.set(response.items);
    this.total.set(this.#resolveTotal(response.total, response.items.length));
  }

  #resolveTotal(responseTotal: number, itemsLength: number): number {
    if (Number.isFinite(responseTotal) && responseTotal > 0) {
      return responseTotal;
    }

    const currentPage = this.pageIndex();
    const currentLimit = this.pageSize();

    if (itemsLength === currentLimit) {
      return (currentPage + 1) * currentLimit + 1;
    }

    return currentPage * currentLimit + itemsLength;
  }

  #currentRequestPage(): number {
    return this.isOneBasedPageIndexing ? this.pageIndex() + 1 : this.pageIndex();
  }
}
