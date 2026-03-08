import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@env';
import {
  HistoryEventRequest,
  HistoryPageRequest,
  HistoryPageResponse,
} from '@history/app/models/history.models';

import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserHistoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(BASE_URL);

  getUserHistory({ page, limit }: HistoryPageRequest): Observable<HistoryPageResponse> {
    const params = new HttpParams({
      fromObject: {
        page: String(page),
        limit: String(limit),
      },
    });

    return this.http
      .get<HistoryEventRequest[]>(`${this.apiUrl}/history`, {
        params,
        observe: 'response',
      })
      .pipe(map((response) => this.#pageLimit(response)));
  }

  postHistoryEvent(payload: HistoryEventRequest): Observable<HistoryEventRequest> {
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
