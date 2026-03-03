import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Type,
  signal,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@ui';

import {
  EventBusService,
  HEADER_EVENTS,
  IN_GOING_EVENTS,
  LoadingService,
  OUT_GOING_EVENTS,
} from '@shared';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NgComponentOutlet } from '@angular/common';
import { LoaderComponent } from '@ui';
import { HeaderShellEventButtons } from './component/header-shell-event-buttons/header-shell-event-buttons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    NgComponentOutlet,
    LoaderComponent,
    HeaderShellEventButtons,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  readonly #eventBusService = inject(EventBusService);
  readonly #router = inject(Router);

  readonly loading = inject(LoadingService).isLoading;
  readonly #destroyRef = inject(DestroyRef);

  readonly OUT_GOING_EVENTS = OUT_GOING_EVENTS;
  readonly isTodoPage = signal(false);
  readonly todoInputComponent = signal<Type<unknown> | null>(null);

  title = 'shell';

  // dispatchEvent(event: OUT_GOING_EVENTS | string): void {
  //   this.#eventBusService.shellEvent(event);
  // }

  async loadTodoInputComponent(): Promise<void> {
    if (this.todoInputComponent()) {
      return;
    }

    const todoInput = await import('@todo/app/todo-input/todo-input');
    this.todoInputComponent.set(todoInput.TodoInput);
  }

  ngOnInit(): void {
    this.#eventBusService.listen();

    this.#eventBusService.inGoingEvents$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((e) => {
        switch (e) {
          case IN_GOING_EVENTS.LOGIN_SUCCESS:
            this.isTodoPage.set(true);
            void this.loadTodoInputComponent();
            this.#router.navigate(['/todo']);
            break;

          case IN_GOING_EVENTS.LOGOUT_SUCCESS:
            this.#router.navigate(['/auth']);
            break;

          case HEADER_EVENTS.SHOW_TODO_INPUT:
            this.isTodoPage.set(true);
            void this.loadTodoInputComponent();
            break;

          case HEADER_EVENTS.CLEAR_HEADER:
            this.isTodoPage.set(false);
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
            this.isTodoPage.set(true);
            void this.loadTodoInputComponent();
            this.#router.navigate(['/todo']);
            break;
          case OUT_GOING_EVENTS.TO_USER:
            this.isTodoPage.set(false);
            this.#router.navigate(['/auth/user']);
            break;
          case OUT_GOING_EVENTS.TO_SIGN_IN:
          case OUT_GOING_EVENTS.TO_SIGN_UP:
          case OUT_GOING_EVENTS.LOGOUT:
            this.isTodoPage.set(false);
            break;
          default:
            break;
        }
      });
  }
}
