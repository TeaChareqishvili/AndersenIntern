import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  HistoryEventRequest,
  UserHistoryService,
} from '../user-history-request/user-history.service';

@Injectable({
  providedIn: 'root',
})
export class HistoryStoreService {
  private readonly _userHistory = signal<HistoryEventRequest[]>([]);
  readonly #userHistoryService = inject(UserHistoryService);
  readonly history = this._userHistory.asReadonly();

  getHisotryList(): Observable<HistoryEventRequest[]> {
    return this.#userHistoryService
      .getUserHistory()
      .pipe(tap((history) => this._userHistory.set(history)));
  }
}
