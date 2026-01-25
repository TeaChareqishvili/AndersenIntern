import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AuthResponse } from '../../models/auth.models';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class RessetPasswordService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/sign-in/reset`;

  RessetPassword(userData: AuthResponse): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(this.apiUrl, userData, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          console.log('password resset successfully TAp', response);
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
