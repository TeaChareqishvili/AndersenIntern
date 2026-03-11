import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@env';
import {
  HistoryEventRequest,
  HistoryPageRequest,
  HistoryPageResponse,
} from '@history/app/models/history.models';

import { Observable, map, tap } from 'rxjs';

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
  }: HistoryPageRequest): Observable<HistoryPageResponse> {
    const params = new HttpParams({
      fromObject: {
        page: String(page),
        limit: String(limit),
        sort: `_${sort}`,
        _order: order,
      },
    });

    return this.http
      .get<HistoryEventRequest[]>(`${this.apiUrl}/history`, {
        params,
        observe: 'response',
      })

      .pipe(
        map((response) => this.#pageLimit(response)),
        tap((response) => console.log('HTTP response get:', response)),
      );
  }

  postHistoryEvent(payload: HistoryEventRequest): Observable<HistoryEventRequest> {
    console.log(payload, 'payload post');
    return this.http.post<HistoryEventRequest>(`${this.apiUrl}/history`, payload);
  }

  #pageLimit(response: HttpResponse<HistoryEventRequest[]>): HistoryPageResponse {
    const items = response.body ?? [];
    const headerTotal = Number(response.headers.get('total-count'));

    return {
      items,
      total: Number.isFinite(headerTotal) ? headerTotal : items.length,
    };
  }
}
