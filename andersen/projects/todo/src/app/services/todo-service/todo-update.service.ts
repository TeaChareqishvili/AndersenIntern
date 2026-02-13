import { Injectable, signal } from '@angular/core';

import { Todo } from '../../models/models';

@Injectable({ providedIn: 'root' })
export class TodoUpdateService {
  private readonly _todos = signal<Todo[]>([]);

  readonly todos = this._todos.asReadonly();

  setTodos(todos: Todo[]) {
    this._todos.set(todos);
  }

  addTodo(newTodo: Todo) {
    this._todos.update((todos) => [...todos, newTodo]);
  }

  removeTodo(id: string): void {
    this._todos.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  addSubtask(updatedTodo: Todo): void {
    this.#updateTodo(updatedTodo.id, () => updatedTodo);
  }

  updateTask(updatedTodo: Todo): void {
    this.#updateTodo(updatedTodo.id, () => updatedTodo);
  }

  deleteSubTask(todoId: string, taskId: string): void {
    this.#updateTodo(todoId, (todo) => ({
      ...todo,
      tasks: todo.tasks.filter((task) => task.id !== taskId),
    }));
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
