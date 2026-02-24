import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogOutServiceService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(BASE_URL);

  signOut(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sign-in/out`);
  }
}
