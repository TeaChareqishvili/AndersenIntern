import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TODO_HISTORY_EVENTS, TodoHistoryEventPayload } from '../../models/shared.models';

@Injectable({
  providedIn: 'root',
})
export class TodoHistoryEventService {
  private readonly historyEventSubject = new Subject<TodoHistoryEventPayload>();

  readonly #EVENT_LABELS: Record<TODO_HISTORY_EVENTS, string> = {
    [TODO_HISTORY_EVENTS.CREATE_TODO]: 'Created todo',
    [TODO_HISTORY_EVENTS.DELETE_TODO]: 'Deleted todo',
    [TODO_HISTORY_EVENTS.CREATE_TASK]: 'Created task',
    [TODO_HISTORY_EVENTS.DELETE_TASK]: 'Deleted task',
    [TODO_HISTORY_EVENTS.UPDATE_TASK]: 'Updated task',
    [TODO_HISTORY_EVENTS.COMPLETED_TASK]: 'Completed task', // ??
    [TODO_HISTORY_EVENTS.VIEW_TODO_DETAILS]: 'Todo details',
  };
  readonly historyEvents$ = this.historyEventSubject.asObservable();

  emitHistoryEvent(payload: TodoHistoryEventPayload): void {
    this.historyEventSubject.next(payload);
  }

  getEventLabel(event: TODO_HISTORY_EVENTS): string {
    return this.#EVENT_LABELS[event] ?? event;
  }
}
