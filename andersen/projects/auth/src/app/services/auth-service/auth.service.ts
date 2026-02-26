import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '@env';
import { AuthResponse } from '../../models/auth.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(BASE_URL);

  signInUser(userData: AuthResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-in`, userData);
  }

  signOut(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sign-in/out`);
  }

  registerUser(userData: AuthResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-up`, userData);
  }

  ressetPassword(userdata: AuthResponse): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/sign-in/reset`, userdata);
  }
}
