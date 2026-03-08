import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserHistoryService } from '../user-history-request/user-history.service';
import {
  HistoryEventRequest,
  HistoryPageRequest,
  HistoryPageResponse,
} from '@history/app/models/history.models';

@Injectable({
  providedIn: 'root',
})
export class HistoryStoreService {
  private readonly _userHistory = signal<HistoryEventRequest[]>([]);
  readonly #userHistoryService = inject(UserHistoryService);
  readonly history = this._userHistory.asReadonly();

  getHisotryList(params: HistoryPageRequest): Observable<HistoryPageResponse> {
    return this.#userHistoryService
      .getUserHistory(params)
      .pipe(tap((history) => this._userHistory.set(history.items)));
  }
}
