import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderSlotService } from '@shared';
import { NgComponentOutlet } from '@angular/common';
import { FooterComponent, HeaderComponent } from '@ui';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, NgComponentOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly headerSlot = inject(HeaderSlotService);
  title = 'shell';
}
