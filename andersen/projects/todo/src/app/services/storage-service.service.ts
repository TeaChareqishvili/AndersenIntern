import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../models/models';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private readonly KEY = 'todos';

  private loadFromStorage(): Todo[] {
    const raw = localStorage.getItem(this.KEY);
    return raw ? JSON.parse(raw) : [];
  }

  private readonly _todos = signal<Todo[]>(this.loadFromStorage());

  readonly todos = this._todos.asReadonly();

  readonly todosCount = computed(() => this._todos().length);

  private saveToStorage(todos: Todo[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(todos));
  }

  private updateTodos(updater: (todos: Todo[]) => Todo[]): void {
    const updated = updater(this._todos());
    this._todos.set(updated);
    this.saveToStorage(updated);
  }

  addTodo(title: string): void {
    this.updateTodos((todos) => [
      ...todos,
      {
        id: crypto.randomUUID(),
        title,
        completed: false,
        subtasks: [],
      },
    ]);
  }

  toggleTodo(todoId: string): void {
    this.updateTodos((todos) =>
      todos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)),
    );
  }

  deleteTodo(todoId: string): void {
    this.updateTodos((todos) => todos.filter((todo) => todo.id !== todoId));
  }

  addSubtask(todoId: string, title: string): void {
    this.updateTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [
                ...todo.subtasks,
                {
                  id: crypto.randomUUID(),
                  title,
                  completed: false,
                },
              ],
            }
          : todo,
      ),
    );
  }

  updateSubtask(todoId: string, subId: string, title: string): void {
    this.updateTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((sub) => (sub.id === subId ? { ...sub, title } : sub)),
            }
          : todo,
      ),
    );
  }

  deleteSubtask(todoId: string, subId: string): void {
    this.updateTodos((todos) =>
      todos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.filter((sub) => sub.id !== subId),
            }
          : todo,
      ),
    );
  }
}
