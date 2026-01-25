import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AuthComponent } from '../../form/auth';
import { AuthResponse, createAuthForm } from '../../models/auth.models';
import { SignInService } from '../../services/sign-in /sign-in';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { exhaustMap, finalize, Subject } from 'rxjs';
import { LoaderComponent } from '@ui';
import { HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthComponent, LoaderComponent, MatSnackBarModule],
  templateUrl: './login.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  readonly form = createAuthForm();
  private logInService = inject(SignInService);
  private snackBar = inject(MatSnackBar);
  private submit$ = new Subject<AuthResponse>();

  readonly loading = signal(false);

  private showSuccess(user: string) {
    return this.snackBar.open(`Welcome ${user} 🎉`, undefined, { duration: 4000 });
  }

  private showError(error: string) {
    this.snackBar.open(` ${error}  🛑`, undefined, { duration: 4000 });
  }

  ngOnInit(): void {
    this.submit$
      .pipe(
        exhaustMap((data) => {
          this.loading.set(true);

          return this.logInService.SignInUser(data).pipe(finalize(() => this.loading.set(false)));
        }),
      )
      .subscribe({
        next: (response: HttpResponse<AuthResponse>) => {
          const user = response?.body?.email;
          console.log('Logged in user:', user);
          this.showSuccess(user || 'Login successful');
        },
        error: (err) => {
          const message = err?.error?.error;
          this.showError(message);
        },
      });
  }

  onLogin(data: AuthResponse): void {
    this.submit$.next(data);
  }
}
