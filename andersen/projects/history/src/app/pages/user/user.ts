import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { AuthUserService, TodoHistoryEventService } from '@shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  HistoryEventRequest,
  UserHistoryService,
} from '@history/app/services/user-history-request/user-history.service';
import { EMPTY, filter, switchMap } from 'rxjs';
import { HistoryList } from '@history/app/components/history-list/history-list';

@Component({
  selector: 'app-user',
  imports: [AsyncPipe, HistoryList],
  templateUrl: './user.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent implements OnInit {
  readonly user$ = inject(AuthUserService).user$;
  readonly #UserHistoryService = inject(UserHistoryService);
  readonly #todoHistoryEventService = inject(TodoHistoryEventService);
  readonly #destroyRef = inject(DestroyRef);
  readonly historyList = signal<HistoryEventRequest[]>([]);

  ngOnInit(): void {
    this.#getHistory();
    this.#postTodoHistory();
  }

  #getHistory(): void {
    this.#UserHistoryService
      .getUserHistory()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (data) => {
          this.historyList.set(data);
        },
      });
  }

  #postTodoHistory() {
    this.#todoHistoryEventService.historyEvents$
      .pipe(
        filter((event): event is NonNullable<typeof event> => event !== null),
        switchMap((event) => {
          const eventData = this.#todoHistoryEventService.eventData;
          if (!eventData?.todo_id) {
            return EMPTY;
          }
          return this.#UserHistoryService.postHistoryEvent({
            event,
            todo_id: eventData.todo_id,
          });
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((createdHistoryEvent) => {
        this.historyList.update((history) => [createdHistoryEvent, ...history]);
      });
  }
}
