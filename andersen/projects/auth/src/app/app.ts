import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { HeaderSlotService } from '@shared';
import { AuthNavigation } from './components/auth-navigation/auth-navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  private readonly headerSlot = inject(HeaderSlotService);
  protected readonly title = signal('auth');

  ngOnInit(): void {
    this.headerSlot.setHeader(AuthNavigation);
  }
}
