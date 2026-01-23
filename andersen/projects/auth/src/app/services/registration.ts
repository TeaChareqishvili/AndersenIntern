import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { RegistrationData } from '../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private http = inject(HttpClient);

  private readonly apiUrl = 'https://animated-marigold-5a0544.netlify.app/v1/sign-up';

  registerUser(userData: RegistrationData): Observable<unknown> {
    return this.http.post(this.apiUrl, userData).pipe(
      tap((response) => {
        console.log('HTTP POST request successful, TAp response:', response);
        console.log('User registered successfully TAp', userData);
      }),
      catchError((error) => {
        console.error('HTTP POST request failed:', error);
        console.error('Error status:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.error);
        return throwError(() => error);
      }),
    );
  }
}
