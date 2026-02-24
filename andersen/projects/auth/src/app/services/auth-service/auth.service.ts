import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@env';
import { API_URL } from '@shared';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly injectedApiUrl = inject(BASE_URL, { optional: true });
  private readonly apiUrl =
    this.injectedApiUrl && this.injectedApiUrl !== 'undefined' ? this.injectedApiUrl : API_URL;

  signInUser(userData: AuthResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-in`, userData);
  }

  signOut(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sign-in/out`);
  }

  registerUser(userData: AuthResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-up`, userData);
  }

  ressetPassword(userData: AuthResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-in/reset`, userData);
  }
}
