import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../../../../environment/envionment.token';
import { AuthResponse, BackendError } from '../../models/auth.models';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private env = inject(ENVIRONMENT);

  private readonly apiUrl = this.env.apiUrl;

  signInUser(userData: AuthResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-in`, userData).pipe(
      catchError((error: BackendError) => {
        return throwError(() => error);
      }),
    );
  }

  signOut(): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/sign-in/out`)
      .pipe(catchError((error: BackendError) => throwError(() => error)));
  }

  registerUser(userData: AuthResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-up`, userData).pipe(
      catchError((error: BackendError) => {
        return throwError(() => error);
      }),
    );
  }

  ressetPassword(userdata: AuthResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-in/reset`, userdata).pipe(
      catchError((error: BackendError) => {
        return throwError(() => error);
      }),
    );
  }
}
