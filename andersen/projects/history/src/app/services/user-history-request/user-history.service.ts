import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@env';
import { HistoryPageRequest, HistoryPageResponse } from '@history/app/models/history.models';
import { TodoHistoryEventPayload } from '@shared';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserHistoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(BASE_URL);

  getUserHistory({
    page,
    limit,
    sort,
    order,
    event,
  }: HistoryPageRequest): Observable<HistoryPageResponse> {
    const params = new HttpParams({
      fromObject: {
        page: String(page),
        limit: String(limit),
        sort: `_${sort}`,
        _order: order,
        ...(event ? { event } : {}),
      },
    });

    return this.http
      .get<TodoHistoryEventPayload[]>(`${this.apiUrl}/history`, {
        params,
        observe: 'response',
      })

      .pipe(map((response) => this.#pageLimit(response)));
  }

  postHistoryEvent(payload: TodoHistoryEventPayload): Observable<TodoHistoryEventPayload> {
    return this.http.post<TodoHistoryEventPayload>(`${this.apiUrl}/history`, payload);
  }

  #pageLimit(response: HttpResponse<TodoHistoryEventPayload[]>): HistoryPageResponse {
    const items = response.body ?? [];
    const headerTotal = Number(response.headers.get('total-count'));

    return {
      items,
      total: Number.isFinite(headerTotal) ? headerTotal : items.length,
    };
  }
}
