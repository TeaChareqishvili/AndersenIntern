import { HttpClient } from '@angular/common/http';
import {inject, Injectable, OnInit} from '@angular/core';
import { BASE_URL } from '@env';
import {catchError, EMPTY, Observable, tap} from 'rxjs';
import {EventBusService} from "../event-bus/event-bus.service";

@Injectable({
  providedIn: 'root',
})
export class LogOutService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = inject(BASE_URL);
  // private readonly EventBusService = inject(EventBusService);

  // Where do you think it's best to place this logic? Where is it more correct?
  signOut(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/sign-in/out`).pipe(
      catchError(()=>{
        // this.responseMessage.error('Logout failed');

        return EMPTY
      }),
      tap(()=>{
        // this.authUserService.setUser(null);
        // this.storage.setItem<null>('APP_SESSION_STATE', null);
        // this.responseMessage.success({ message: 'Logged out successfully 👋' }).subscribe();
      })
    )
    //   .subscribe({
    //   next: () => {
    //     this.authUserService.setUser(null);
    //     this.storage.setItem<null>('APP_SESSION_STATE', null);
    //     void this.router.navigateByUrl('/auth/sign-in');
    //     this.responseMessage.success({ message: 'Logged out successfully 👋' }).subscribe();
    //   },
    //   error: () => {
    //     this.responseMessage.error('Logout failed');
    //   },
    // });
  }
}
