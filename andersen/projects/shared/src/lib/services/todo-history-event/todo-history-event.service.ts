import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TODO_HISTORY_EVENTS, TodoHistoryEventPayload } from '../../models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class TodoHistoryEventService {
  private readonly historyEventSubject = new Subject<TodoHistoryEventPayload>();
  readonly historyEvents$ = this.historyEventSubject.asObservable();

  emitHistoryEvent(payload: TodoHistoryEventPayload): void {
    this.historyEventSubject.next(payload);
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
