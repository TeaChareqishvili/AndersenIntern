import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@ui';
import { MatButton } from '@angular/material/button';
import {
  EventBusService,
  IN_GOING_EVENTS, OUT_GOING_EVENTS,
} from '@shared';
import { AuthUserService } from '@shared';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, MatButton, AsyncPipe],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly #eventBusService = inject(EventBusService);
  readonly #router = inject(Router);
  readonly #authUserService = inject(AuthUserService);
  readonly #destroyRef = inject(DestroyRef);

  readonly user$ = this.#authUserService.user$;
  readonly OUT_GOING_EVENTS = OUT_GOING_EVENTS;

  title = 'shell';

  dispatchEvent(event: string): void {
    console.log(event);
    this.#eventBusService.shellEvent(event);
  }

  ngOnInit(): void {
    this.#eventBusService.listen();

    this.#eventBusService.inGoingEvents$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((e) => {
        debugger;
        switch (e) {
          case IN_GOING_EVENTS.LOGIN_SUCCESS:
            this.#router.navigate(['/todo']);
            break;
          case IN_GOING_EVENTS.LOGOUT_SUCCESS:
            this.#router.navigate(['/auth']);
            break;
          default:
            break;
        }
      });
  }
}
