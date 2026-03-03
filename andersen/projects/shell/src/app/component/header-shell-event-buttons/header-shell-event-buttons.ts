import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthUserService, EventBusService, LoadingService, OUT_GOING_EVENTS } from '@shared';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-header-shell-event-buttons',
  imports: [AsyncPipe, MatButton],
  templateUrl: './header-shell-event-buttons.html',
})
export class HeaderShellEventButtons {
  readonly user$ = inject(AuthUserService).user$;
  readonly loading = inject(LoadingService).isLoading;
  readonly #eventBusService = inject(EventBusService);

  readonly OUT_GOING_EVENTS = OUT_GOING_EVENTS;

  dispatchEvent(event: OUT_GOING_EVENTS | string): void {
    this.#eventBusService.shellEvent(event);
  }
}
