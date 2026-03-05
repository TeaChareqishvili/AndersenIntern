import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@env';
import { TODO_HISTORY_EVENTS } from '@shared';
import { Observable } from 'rxjs';

export type HistoryEventRequest = {
  event: TODO_HISTORY_EVENTS;
  todo_id: string;
  date?: string;
};

@Injectable({
  providedIn: 'root',
})
export class UserHistoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(BASE_URL);

  getUserHistory(): Observable<HistoryEventRequest[]> {
    return this.http.get<HistoryEventRequest[]>(`${this.apiUrl}/history?limit=100&page=1`);
  }

  postHistoryEvent(payload: HistoryEventRequest): Observable<HistoryEventRequest> {
    return this.http.post<HistoryEventRequest>(`${this.apiUrl}/history`, payload);
  }
}
