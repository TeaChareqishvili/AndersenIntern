import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { createSubTaskGroup, createTodoGroup, Todo } from '../models/models';
import { Form } from '../form/form';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TodoUpdateService } from '../services/todo-service/todo-update.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { LoaderComponent } from '@ui';

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
    LoaderComponent,
  ],
  templateUrl: './todo-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCard {
  private readonly todoUpdateService = inject(TodoUpdateService);
  private readonly destroyRef = inject(DestroyRef);
  readonly todo = input.required<Todo>();
  readonly form = createTodoGroup();
  readonly loader = signal(false);

  readonly syncSubTasks = effect(() => {
    this.#buildFromSignal();
  });

  editingIndex = signal<string | null>(null);

  get subtasks(): FormArray<FormGroup> {
    return this.form.controls.tasks;
  }

  deleteTodo(): void {
    this.loader.set(true);
    this.todoUpdateService
      .removeTodo(this.todo().id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loader.set(false)),
      )
      .subscribe({});
  }

  addSubtask({ name }: { name: string }): void {
    this.loader.set(true);
    this.todoUpdateService
      .addSubtask(this.todo().id, name)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loader.set(false)),
      )
      .subscribe({
        next: () => {
          this.editingIndex.set(null);
        },
      });
  }

  saveSubtask(sub: FormGroup): void {
    this.loader.set(true);
    const { id, name, completed } = sub.value;
    this.todoUpdateService
      .updateTask(this.todo().id, id, { name, completed })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loader.set(false)),
      )
      .subscribe({
        next: () => {
          this.cancelEditing();
        },
      });
  }

  deleteSubtask(taskId: string): void {
    this.loader.set(true);
    this.todoUpdateService
      .deleteSubTask(this.todo().id, taskId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loader.set(false)),
      )
      .subscribe({
        next: () => {
          if (this.editingIndex() === taskId) {
            this.editingIndex.set(null);
          }
        },
      });
  }

  toggleSubtask(sub: FormGroup): void {
    const { id, name, completed } = sub.value;
    this.todoUpdateService.updateTask(this.todo().id, id, { name, completed });
  }

  startEditing(taskId: string): void {
    this.editingIndex.set(taskId);
  }

  cancelEditing(): void {
    this.#buildFromSignal();
    this.editingIndex.set(null);
  }

  #buildFromSignal(): void {
    this.subtasks.clear();
    this.todo().tasks.forEach((sub) => {
      const form = createSubTaskGroup();
      form.patchValue(sub);
      this.subtasks.push(form);
    });
  }
}
