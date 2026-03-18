import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthUserService, EventBusService, LoadingService, OUT_GOING_EVENTS } from '@shared';
import { MatButton } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-header-shell-event-buttons',
  imports: [AsyncPipe, MatButton, TranslatePipe],
  templateUrl: './header-shell-event-buttons.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class HeaderShellEventButtons {
  readonly user$ = inject(AuthUserService).user$;
  readonly loading = inject(LoadingService).isLoading;
  readonly #eventBusService = inject(EventBusService);

  readonly OUT_GOING_EVENTS = OUT_GOING_EVENTS;

  dispatchEvent(event: OUT_GOING_EVENTS | null): void {
    this.#eventBusService.shellEvent(event);
  }
}
