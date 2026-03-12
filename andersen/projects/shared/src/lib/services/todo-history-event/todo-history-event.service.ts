import { Injectable } from '@angular/core';
import { TodoHistoryEventPayload } from '@shared';
import { Subject } from 'rxjs';

export enum TODO_HISTORY_EVENTS {
  CREATE_TODO = 'CREATE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  CREATE_TASK = 'CREATE_TASK',
  DELETE_TASK = 'DELETE_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
}

@Injectable({
  providedIn: 'root',
})
export class TodoHistoryEventService {
  private readonly historyEventSubject = new Subject<TodoHistoryEventPayload>();

  readonly EVENT_LABELS: Record<TODO_HISTORY_EVENTS, string> = {
    [TODO_HISTORY_EVENTS.CREATE_TODO]: 'Created todo',
    [TODO_HISTORY_EVENTS.DELETE_TODO]: 'Deleted todo',
    [TODO_HISTORY_EVENTS.CREATE_TASK]: 'Created task',
    [TODO_HISTORY_EVENTS.DELETE_TASK]: 'Deleted task',
    [TODO_HISTORY_EVENTS.UPDATE_TASK]: 'Updated task',
  };
  readonly historyEvents$ = this.historyEventSubject.asObservable();

  emitHistoryEvent(payload: TodoHistoryEventPayload): void {
    this.historyEventSubject.next(payload);
  }
}
