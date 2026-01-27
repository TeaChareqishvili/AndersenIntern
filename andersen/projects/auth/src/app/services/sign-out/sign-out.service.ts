import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../environment/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignOutService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/sign-in/out`;

  // requires token for successful sign out

  signOut(): Observable<void> {
    return this.http.delete<void>(this.apiUrl).pipe(
      tap(() => console.log('User signed out')),
      catchError((error) => throwError(() => error)),
    );
  }
}
