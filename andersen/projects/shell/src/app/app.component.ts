import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@ui';
import { MatButton } from '@angular/material/button';
import { EventBusService, IN_GOING_EVENTS, OUT_GOING_EVENTS } from '@shared';
import { AuthUserService } from '@shared';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { LoaderComponent } from '@ui';
import { TodoInput } from '@todo/app/todo-input/todo-input';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatButton,
    AsyncPipe,
    LoaderComponent,
    TodoInput,
  ],
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
  readonly logoutLoading = signal(false);
  readonly isTodoPage = signal(false);

  title = 'shell';

  dispatchEvent(event: OUT_GOING_EVENTS | string): void {
    if (event === OUT_GOING_EVENTS.LOGOUT) {
      if (this.logoutLoading()) {
        return;
      }
      this.logoutLoading.set(true);
    }
    console.log(event);
    this.#eventBusService.shellEvent(event);
  }

  ngOnInit(): void {
    this.#eventBusService.listen();
    this.isTodoPage.set(this.#router.url.startsWith('/todo'));

    this.#router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe((event) => {
        this.isTodoPage.set(event.urlAfterRedirects.startsWith('/todo'));
      });

    this.#eventBusService.inGoingEvents$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((e) => {
        switch (e) {
          case IN_GOING_EVENTS.LOGIN_SUCCESS:
            this.#router.navigate(['/todo']);
            break;
          case IN_GOING_EVENTS.LOGOUT_SUCCESS:
            this.logoutLoading.set(false);
            this.#router.navigate(['/auth']);
            break;
          default:
            break;
        }
      });

    this.#eventBusService.outGoingEvents$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((e) => {
        switch (e) {
          case OUT_GOING_EVENTS.TO_TODO:
            this.#router.navigate(['/todo']);
            break;
          case OUT_GOING_EVENTS.TO_USER:
            this.#router.navigate(['/auth/user']);
            break;
          default:
            break;
        }
      });
  }
}
