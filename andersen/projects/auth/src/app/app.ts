import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from 'ui';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('auth');
}
