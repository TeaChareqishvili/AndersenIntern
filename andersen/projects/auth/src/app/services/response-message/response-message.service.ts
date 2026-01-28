import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ResponseMessage } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class ResponseMessageService {
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  success(payload: ResponseMessage) {
    const ref = this.snackBar.open(payload.message, undefined, {
      duration: 3000,
    });

    return payload.navigateTo
      ? ref.afterDismissed().pipe(tap(() => this.router.navigate([payload.navigateTo])))
      : ref.afterDismissed();
  }

  error(message: string) {
    this.snackBar.open(message, undefined, {
      duration: 4000,
    });
  }
}
