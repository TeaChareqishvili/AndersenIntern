import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent } from '@ui';
import { AUTH_ROUTES } from './app.routes';
import { AuthService } from './services/auth-service/auth-service.service';
import { SignOutService } from './services/sign-out/sign-out.service';
import { finalize } from 'rxjs/internal/operators/finalize';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSnackBarModule, HeaderComponent, FooterComponent, MatButtonModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('auth');
  private authService = inject(AuthService);
  private router = inject(Router);
  private signOutService = inject(SignOutService);
  private snackBar = inject(MatSnackBar);

  readonly loading = signal(false);

  user = this.authService.user;

  navigateToSignUp(): void {
    this.router.navigate([AUTH_ROUTES.REGISTER]);
  }

  navigateToSignIn(): void {
    this.router.navigate([AUTH_ROUTES.LOGIN]);
  }

  onLogout(): void {
    this.loading.set(true);

    this.signOutService
      .signOut()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.authService.clearUser();

          const snackRef = this.snackBar.open('Logged out successfully 👋', undefined, {
            duration: 2000,
          });

          snackRef.afterDismissed().subscribe(() => {
            this.router.navigate([AUTH_ROUTES.LOGIN]);
          });
        },
        error: () => {
          this.snackBar.open('Logout failed ❌', undefined, { duration: 4000 });
        },
      });
  }
}
