import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from '../../environment/envionment.token';
import { AuthResponse } from '../../models/auth.models';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private env = inject(ENVIRONMENT);

  private readonly apiUrl = this.env.apiUrl;

  signInUser(userData: AuthResponse): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/sign-in`, userData, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          console.log('User sign in  successfully TAp', response);
        }),
        map((res) => res.body as AuthResponse),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  signOut(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sign-in/out`).pipe(
      tap(() => console.log('User signed out')),
      catchError((error) => throwError(() => error)),
    );
  }

  registerUser(userData: AuthResponse): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/sign-up`, userData, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          console.log('User registered successfully TAp', response);
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  ressetPassword(userdata: AuthResponse): Observable<HttpResponse<AuthResponse>> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/sign-in/reset`, userdata, {
        observe: 'response',
      })
      .pipe(
        tap((response) => {
          console.log('password resset successfully TAp', response);
        }),
        catchError((error) => {
          console.error('Password resset failed', error.body);
          return throwError(() => error);
        }),
      );
  }
}
