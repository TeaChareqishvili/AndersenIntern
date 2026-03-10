import { HttpInterceptorFn } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

import { TodoHistoryEventService, TODO_HISTORY_EVENTS, Todo } from '@shared';
import { BASE_URL } from '@env';

type TodoEventRoute = {
  method: string;
  path: string;
  event: TODO_HISTORY_EVENTS;
};

const TODO_EVENT_MAP: TodoEventRoute[] = [
  { method: 'POST', path: '/todo', event: TODO_HISTORY_EVENTS.CREATE_TODO },
  { method: 'DELETE', path: '/todo', event: TODO_HISTORY_EVENTS.DELETE_TODO },
  { method: 'POST', path: '/todo/task', event: TODO_HISTORY_EVENTS.CREATE_TASK },
  { method: 'DELETE', path: '/todo/task', event: TODO_HISTORY_EVENTS.DELETE_TASK },
  { method: 'POST', path: '/todo/edit-task', event: TODO_HISTORY_EVENTS.UPDATE_TASK },
];

const isTodoSnapshot = (value: unknown): value is Todo => {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<Todo>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    Array.isArray(candidate.tasks)
  );
};

export const todoHistoryInterceptor: HttpInterceptorFn = (req, next) => {
  const historyService = inject(TodoHistoryEventService);
  const apiUrl = inject(BASE_URL);

  let todoSnapshot: Todo | undefined;

  return next(req).pipe(
    tap((event) => {
      if (!(event instanceof HttpResponse)) return;

      const requestPath = new URL(req.url, apiUrl).pathname;
      const matchedRoute = TODO_EVENT_MAP.find(
        (route) => req.method === route.method && requestPath.endsWith(route.path),
      );

      if (!matchedRoute) return;

      const responseBody = event.body;
      const responseTodo = isTodoSnapshot(responseBody) ? responseBody : undefined;
      const todoId = responseTodo?.id ?? req.params.get('id');

      if (!todoId) return;

      if (matchedRoute.event === TODO_HISTORY_EVENTS.DELETE_TODO) {
        todoSnapshot = {
          id: todoId,
          name: req.params.get('name') ?? '',
          tasks: [],
        };
      } else {
        todoSnapshot = responseTodo;
      }

      historyService.emitHistoryEvent({
        event: matchedRoute.event,
        todo_id: todoId,
        todo: todoSnapshot,
      });
    }),
  );
};
