import { Injectable, signal, inject } from '@angular/core';
import { SubTask, Todo } from '../models/models';
import { StorageService } from '@shared';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly storage = inject(StorageService);

  private readonly TODOS_KEY = 'todos';
  private readonly _todos = signal<Todo[]>(this.storage.getItem<Todo[]>(this.TODOS_KEY) ?? []);
  readonly todos = this._todos.asReadonly();

  addTodo(title: string): void {
    this.#commit((todos) => [...todos, this.#createTodo(title)]);
  }

  deleteTodo(todoId: string): void {
    this.#commit((todos) => todos.filter((t) => t.id !== todoId));
  }

  addSubtask(todoId: string, title: string): void {
    this.#commit((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [...todo.subtasks, this.#createSubtask(title)],
            }
          : todo,
      ),
    );
  }

  updateSubtask(todoId: string, subId: string, title: string): void {
    this.#commit((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((s) => (s.id === subId ? { ...s, title } : s)),
            }
          : todo,
      ),
    );
  }

  deleteSubtask(todoId: string, subId: string): void {
    this.#commit((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter((s) => s.id !== subId),
            }
          : todo,
      ),
    );
  }

  toggleSubtask(todoId: string, subId: string): void {
    this.#commit((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((s) =>
                s.id === subId ? { ...s, completed: !s.completed } : s,
              ),
            }
          : todo,
      ),
    );
  }

  #commit(updater: (todos: Todo[]) => Todo[]): void {
    const next = updater(this._todos());
    this._todos.set(next);
    this.storage.setItem(this.TODOS_KEY, next);
  }

  #createSubtask(title: string): SubTask {
    return {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };
  }

  #createTodo(title: string): Todo {
    return {
      id: crypto.randomUUID(),
      title,
      subtasks: [],
    };
  }
}
