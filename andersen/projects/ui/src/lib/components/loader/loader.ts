import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'lib-loader',
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class LoaderComponent {}
