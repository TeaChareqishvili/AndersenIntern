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
import {
  HistoryEventRequest,
  UserHistoryService,
} from '@history/app/services/user-history-request/user-history.service';

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
  readonly #userHistoryService = inject(UserHistoryService);
  readonly #destroyRef = inject(DestroyRef);
  readonly historyList = signal<HistoryEventRequest[]>([]);

  ngOnInit(): void {
    this.#getHistory();
  }

  #getHistory(): void {
    this.#userHistoryService
      .getUserHistory()
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        next: (data) => {
          this.historyList.set(data);
        },
      });
  }
}
