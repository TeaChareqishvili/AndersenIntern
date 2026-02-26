import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';

import { Router, RouterOutlet } from '@angular/router';
import { EventBusService, OUT_GOING_EVENTS } from '@shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  readonly #eventBusService = inject(EventBusService);
  readonly #router = inject(Router);
  readonly #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.#eventBusService.outGoingEvents$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((e) => {
        debugger
        switch (e) {
          case OUT_GOING_EVENTS.TO_SIGN_IN:
            this.#router.navigate(['auth/sign-in']);
            break;
          case OUT_GOING_EVENTS.TO_SIGN_UP:
            this.#router.navigate(['auth/sign-up']);
            break;
          default:
            break;
        }
      });
  }
}
