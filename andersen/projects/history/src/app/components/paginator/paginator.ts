import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  imports: [MatPaginatorModule],
  templateUrl: './paginator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PaginatorComponent {
  readonly total = input<number>(0);
  readonly pageIndex = input<number>(0);
  readonly pageSize = input<number>(5);
  readonly pageSizeOptions = input<number[]>([5, 10, 15]);
  readonly pageChange = output<PageEvent>();

  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
