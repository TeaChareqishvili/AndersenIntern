import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

import { TodoHistoryEventService, TODO_HISTORY_EVENTS } from '@shared';

export const todoHistoryInterceptor: HttpInterceptorFn = (req, next) => {
  const historyService = inject(TodoHistoryEventService);

  return next(req).pipe(
    tap((event) => {
      if (!(event instanceof HttpResponse)) return;

      const { url, method, params } = req;
      const body = event.body as { id?: string } | null;

      if (method === 'POST' && url?.endsWith('/todo')) {
        if (!body?.id) return;

        historyService.emitHistoryEvent({
          event: TODO_HISTORY_EVENTS.CREATE_TODO,
          todo_id: body.id,
        });
      }

      if (method === 'DELETE' && url?.includes('/todo')) {
        const todoId = params.get('id');

        if (todoId) {
          historyService.emitHistoryEvent({
            event: TODO_HISTORY_EVENTS.DELETE_TODO,
            todo_id: todoId,
          });
        }
      }

      if (method === 'POST' && url?.includes('/todo/task')) {
        if (!body?.id) return;

        historyService.emitHistoryEvent({
          event: TODO_HISTORY_EVENTS.CREATE_TASK,
          todo_id: body.id,
        });
      }

      if (method === 'DELETE' && url?.includes('/todo/task')) {
        const todoId = params.get('id');

        if (todoId) {
          historyService.emitHistoryEvent({
            event: TODO_HISTORY_EVENTS.DELETE_TASK,
            todo_id: todoId,
          });
        }
      }

      if (method === 'POST' && url?.includes('/todo/edit-task')) {
        if (!body?.id) return;

        historyService.emitHistoryEvent({
          event: TODO_HISTORY_EVENTS.UPDATE_TASK,
          todo_id: body.id,
        });
      }
    }),
  );
};
