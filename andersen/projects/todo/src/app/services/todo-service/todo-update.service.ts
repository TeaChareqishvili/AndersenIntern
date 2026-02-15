import { inject, Injectable, signal } from '@angular/core';

import { Todo, UpdateSubTask } from '../../models/models';
import { RequestServiceTodo } from '../request-service/request-service.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoUpdateService {
  private readonly todoServiceApi = inject(RequestServiceTodo);
  private readonly _todos = signal<Todo[]>([]);

  readonly todos = this._todos.asReadonly();

  getTodoList(): Observable<Todo[]> {
    return this.todoServiceApi.getTodos().pipe(tap((todos) => this._todos.set(todos)));
  }

  addTodo(name: string): Observable<Todo> {
    return this.todoServiceApi
      .addTodo(name)
      .pipe(tap((createdTodo) => this._todos.update((todos) => [...todos, createdTodo])));
  }

  removeTodo(id: string): Observable<Todo> {
    return this.todoServiceApi
      .deleteTodo(id)
      .pipe(tap(() => this._todos.update((todos) => todos.filter((todo) => todo.id !== id))));
  }

  addSubtask(id: string, name: string): Observable<Todo> {
    return this.todoServiceApi
      .createSubTask(id, name)
      .pipe(tap((updatedTodo) => this.#updateTodo(updatedTodo.id, () => updatedTodo)));
  }

  updateTask(todoId: string, taskId: string, payload: UpdateSubTask): Observable<Todo> {
    return this.todoServiceApi
      .updateSubTask(todoId, taskId, payload)
      .pipe(tap((updatedTodo) => this.#updateTodo(updatedTodo.id, () => updatedTodo)));
  }

  deleteSubTask(todoId: string, taskId: string): Observable<Todo> {
    return this.todoServiceApi.deleteSubTask(todoId, taskId).pipe(
      tap(() =>
        this.#updateTodo(todoId, (todo) => ({
          ...todo,
          tasks: todo.tasks.filter((task) => task.id !== taskId),
        })),
      ),
    );
  }

  toggleSubtask(todoId: string, subId: string): void {
    this.#updateTodo(todoId, (todo) => ({
      ...todo,
      tasks: todo.tasks.map((sub) =>
        sub.id === subId ? { ...sub, completed: !sub.completed } : sub,
      ),
    }));
  }

  cancelEditing(todos: Todo[]): void {
    this._todos.set(todos);
  }

  #updateTodo(todoId: string, updater: (todo: Todo) => Todo): void {
    this._todos.update((todos) => todos.map((todo) => (todo.id === todoId ? updater(todo) : todo)));
  }
}
