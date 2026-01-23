import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent } from '@ui';
import { AUTH_ROUTES } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatButtonModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('auth');

  private router = inject(Router);

  navigateToSignUp(): void {
    this.router.navigate([AUTH_ROUTES.REGISTER]);
  }

  navigateToSignIn(): void {
    this.router.navigate([AUTH_ROUTES.LOGIN]);
  }
}
