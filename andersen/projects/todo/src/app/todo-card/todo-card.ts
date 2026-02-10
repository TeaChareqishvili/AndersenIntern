import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';

import { createSubTaskGroup, createTodoGroup, Todo } from '../models/models';
import { Form } from '../form/form';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoService } from '../services/todo-service.service';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    Form,
  ],
  templateUrl: './todo-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCard {
  private readonly todoService = inject(TodoService);
  readonly todo = input.required<Todo>();
  readonly form = createTodoGroup();

  editingIndex = signal<number | null>(null);

  get subtasks(): FormArray<FormGroup> {
    return this.form.controls.subtasks;
  }

  readonly syncSubTasks = effect(() => {
    this.subtasks.clear();

    this.todo().subtasks.forEach((s) => {
      const form = createSubTaskGroup();
      form.patchValue(s);
      this.subtasks.push(form);
    });
  });

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo().id);
  }

  addSubtask({ title }: { title: string }): void {
    this.todoService.addSubtask(this.todo().id, title);
  }

  deleteSubtask(index: number): void {
    this.todoService.deleteSubtask(this.todo().id, this.#getSubtaskId(index));
  }

  toggleSubtask(index: number): void {
    this.todoService.toggleSubtask(this.todo().id, this.#getSubtaskId(index));
  }

  startEditing(index: number): void {
    this.editingIndex.set(index);
  }

  cancelEditing(): void {
    this.editingIndex.set(null);
  }

  saveSubtask(index: number): void {
    const title = this.subtasks.at(index).value.title;
    this.todoService.updateSubtask(this.todo().id, this.#getSubtaskId(index), title);
    this.cancelEditing();
  }

  #getSubtaskId(index: number) {
    return this.todo().subtasks[index].id;
  }
}
