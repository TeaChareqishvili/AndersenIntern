import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-logo',
  imports: [],
  templateUrl: './logo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoComponent {
  readonly logoPath = '/logo.webp';
}
