import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TODO_HISTORY_EVENTS, TodoHistoryEventData } from '../../models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class TodoHistoryEventService implements OnDestroy {
  readonly historyEvents$ = new BehaviorSubject<TODO_HISTORY_EVENTS | null>(null);
  readonly #eventData$ = new BehaviorSubject<TodoHistoryEventData | null>(null);

  todoHistoryEvent(event: TODO_HISTORY_EVENTS | null): void {
    this.historyEvents$.next(event);
  }

  appHistoryEvent(event: TODO_HISTORY_EVENTS, data: TodoHistoryEventData): void {
    this.#eventData$.next(data);
    this.historyEvents$.next(event);
  }

  get eventData(): TodoHistoryEventData | null {
    return this.#eventData$.value;
  }

  ngOnDestroy(): void {
    this.historyEvents$.complete();
    this.#eventData$.complete();
  }

  getEventLabel(event: TODO_HISTORY_EVENTS): string {
    switch (event) {
      case TODO_HISTORY_EVENTS.CREATE_TODO:
        return 'Created todo';
      case TODO_HISTORY_EVENTS.DELETE_TODO:
        return 'Deleted todo';
      case TODO_HISTORY_EVENTS.CREATE_TASK:
        return 'Created task';
      case TODO_HISTORY_EVENTS.DELETE_TASK:
        return 'Deleted task';
      case TODO_HISTORY_EVENTS.UPDATE_TASK:
        return 'Updated task';
      default:
        return event;
    }
  }
}
