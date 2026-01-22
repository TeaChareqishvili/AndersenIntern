import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent, FooterComponent } from '@ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatButtonModule],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('auth');

  private router = inject(Router);

  navigateToSignUp() {
    this.router.navigate(['/signUp']);
  }

  navigateToSignIn() {
    this.router.navigate(['/signIn']);
  }
}
