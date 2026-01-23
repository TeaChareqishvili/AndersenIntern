import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
