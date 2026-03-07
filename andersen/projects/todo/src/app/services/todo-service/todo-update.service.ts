import { inject, Injectable, signal } from '@angular/core';

import { Todo, UpdateSubTask } from '../../models/models';
import { RequestServiceTodo } from '../request-service/request-service.service';
import { TodoHistoryEventService, TODO_HISTORY_EVENTS } from '@shared';
import { map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoUpdateService {
  private readonly todoServiceApi = inject(RequestServiceTodo);
  private readonly todoHistoryEventService = inject(TodoHistoryEventService);
  private readonly _todos = signal<Todo[]>([]);

  readonly todos = this._todos.asReadonly();

  getTodoList(): Observable<Todo[]> {
    return this.todoServiceApi.getTodos().pipe(tap((todos) => this._todos.set(todos)));
  }

  addTodo(name: string): Observable<Todo[]> {
    return this.todoServiceApi.addTodo(name).pipe(
      tap((createdTodo) => {
        this._todos.update((todos) => [...todos, createdTodo]);
        this.todoHistoryEventService.emitHistoryEvent({
          event: TODO_HISTORY_EVENTS.CREATE_TODO,
          todo_id: createdTodo.id,
        });
      }),
      map(() => this.#getUpdatedTodos()),
    );
  }

  removeTodo(id: string): Observable<Todo[]> {
    return this.todoServiceApi.deleteTodo(id).pipe(
      tap(() => {
        this._todos.update((todos) => todos.filter((todo) => todo.id !== id));
        this.todoHistoryEventService.emitHistoryEvent({
          event: TODO_HISTORY_EVENTS.DELETE_TODO,
          todo_id: id,
        });
      }),
      map(() => this.#getUpdatedTodos()),
    );
  }

  addSubtask(id: string, name: string): Observable<Todo[]> {
    return this.todoServiceApi.createSubTask(id, name).pipe(
      tap((updatedTodo) => {
        this.#updateTodo(updatedTodo.id, () => updatedTodo);
        this.todoHistoryEventService.emitHistoryEvent({
          event: TODO_HISTORY_EVENTS.CREATE_TASK,
          todo_id: updatedTodo.id,
        });
      }),
      map(() => this.#getUpdatedTodos()),
    );
  }

  updateTask(todoId: string, taskId: string, payload: UpdateSubTask): Observable<Todo[]> {
    return this.todoServiceApi.updateSubTask(todoId, taskId, payload).pipe(
      tap((updatedTask) => {
        this.#updateTodo(updatedTask.id, () => updatedTask);
        this.todoHistoryEventService.emitHistoryEvent({
          event: TODO_HISTORY_EVENTS.UPDATE_TASK,
          todo_id: updatedTask.id,
        });
      }),
      map(() => this.#getUpdatedTodos()),
    );
  }

  deleteSubTask(todoId: string, taskId: string): Observable<Todo[]> {
    return this.todoServiceApi.deleteSubTask(todoId, taskId).pipe(
      tap(() => {
        this.#updateTodo(todoId, (todo) => ({
          ...todo,
          tasks: todo.tasks.filter((task) => task.id !== taskId),
        }));
        this.todoHistoryEventService.emitHistoryEvent({
          event: TODO_HISTORY_EVENTS.DELETE_TASK,
          todo_id: todoId,
        });
      }),
      map(() => this.#getUpdatedTodos()),
    );
  }

  toggleSubtask(todoId: string, subId: string): void {
    this.#updateTodo(todoId, (todo) => ({
      ...todo,
      tasks: todo.tasks.map((sub) =>
        sub.id === subId ? { ...sub, completed: !sub.completed } : sub,
      ),
    }));
    this.todoHistoryEventService.emitHistoryEvent({
      event: TODO_HISTORY_EVENTS.COMPLETED_TASK,
      todo_id: todoId, // ??? TODO
    });
  }

  cancelEditing(todos: Todo[]): void {
    this._todos.set(todos);
  }

  #updateTodo(todoId: string, updater: (todo: Todo) => Todo): void {
    this._todos.update((todos) => todos.map((todo) => (todo.id === todoId ? updater(todo) : todo)));
  }

  #getUpdatedTodos(): Todo[] {
    return this._todos();
  }
}
