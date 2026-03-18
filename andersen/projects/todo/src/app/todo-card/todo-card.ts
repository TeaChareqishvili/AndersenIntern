import { ChangeDetectionStrategy, Component, effect, input, output, signal } from '@angular/core';
import { createSubTaskGroup, createTodoGroup, Todo, UpdateSubTask } from '../models/models';
import { Form } from '../form/form';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '@ui';
import { TranslatePipe } from '@ngx-translate/core';

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
    TranslatePipe,
  ],
  templateUrl: './todo-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCard {
  readonly todo = input.required<Todo>();
  readonly taskLoading = input<boolean>(false);
  readonly confirmedTaskUpdate = input<{ todoId: string; taskId: string; token: number } | null>(
    null,
  );
  readonly form = createTodoGroup();
  readonly deleteTodo = output<Todo>();
  readonly addSubtask = output<{ todoId: string; name: string }>();
  readonly updateSubtask = output<{ todoId: string; taskId: string; payload: UpdateSubTask }>();
  readonly deleteTask = output<{ todoId: string; taskId: string }>();

  readonly syncSubTasks = effect(() => {
    this.#buildFromSignal();
  });
  readonly syncConfirmedUpdates = effect(() => {
    const confirmation = this.confirmedTaskUpdate();
    if (!confirmation) {
      return;
    }

    if (confirmation.todoId === this.todo().id) {
      this.editingIndex.set(null);
    }
  });

  get subtasks(): FormArray<FormGroup> {
    return this.form.controls.tasks;
  }

  editingIndex = signal<string | null>(null);

  onDeleteTodo(todo: Todo) {
    this.deleteTodo.emit(todo);
  }

  onAddSubTask({ name }: { name: string }): void {
    if (this.taskLoading()) {
      return;
    }
    if (!name.trim()) {
      return;
    }
    this.addSubtask.emit({
      todoId: this.todo().id,
      name: name.trim(),
    });
  }

  onSaveSubtask(sub: FormGroup): void {
    if (this.taskLoading()) {
      return;
    }

    const { id, name, completed } = sub.getRawValue();
    if (typeof id !== 'string') {
      return;
    }

    this.updateSubtask.emit({
      todoId: this.todo().id,
      taskId: id,
      payload: { name, completed },
    });
  }

  onDeleteSubtask(taskId: string): void {
    if (this.taskLoading()) {
      return;
    }

    this.deleteTask.emit({ todoId: this.todo().id, taskId });
    if (this.editingIndex() === taskId) {
      this.editingIndex.set(null);
    }
  }

  onToggleSubtask(sub: FormGroup): void {
    if (this.taskLoading()) {
      return;
    }

    const { id, name, completed } = sub.getRawValue();
    if (typeof id !== 'string') {
      return;
    }

    this.updateSubtask.emit({
      todoId: this.todo().id,
      taskId: id,
      payload: { name, completed },
    });
  }

  startEditing(taskId: string): void {
    if (this.taskLoading()) {
      return;
    }

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
