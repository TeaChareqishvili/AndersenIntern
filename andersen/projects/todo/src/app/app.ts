import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { EventBusService, HEADER_EVENTS } from '@shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit, OnDestroy {
  readonly #eventBusService = inject(EventBusService);

  ngOnInit(): void {
    this.#eventBusService.appEvent(HEADER_EVENTS.SHOW_TODO_INPUT, null);
  }

  ngOnDestroy(): void {
    this.#eventBusService.appEvent(HEADER_EVENTS.CLEAR_HEADER, null);
  }
}
