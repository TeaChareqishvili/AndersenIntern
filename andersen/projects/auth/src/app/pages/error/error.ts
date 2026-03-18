import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './error.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {}
