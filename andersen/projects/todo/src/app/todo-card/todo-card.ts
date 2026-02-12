import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { createSubTaskGroup, createTodoGroup, Todo } from '../models/models';
import { Form } from '../form/form';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestServiceTodo } from '../services/request-service/request-service.service';

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
  private readonly todosService = inject(RequestServiceTodo);
  readonly todo = input.required<Todo>();
  readonly form = createTodoGroup();

  editingIndex = signal<string | null>(null);

  get subtasks(): FormArray<FormGroup> {
    return this.form.controls.tasks;
  }

  readonly syncSubTasks = effect(() => {
    this.subtasks.clear();

    this.todo().tasks.forEach((sub) => {
      const form = createSubTaskGroup();
      form.patchValue(sub);
      this.subtasks.push(form);
    });
  });

  deleteTodo(): void {
    this.todosService.deleteTodo(this.todo().id).subscribe({
      next: () => {
        this.todosService.removeTodoFromStore(this.todo().id);
      },
    });
  }

  addSubtask({ name }: { name: string }): void {
    this.todosService.createSubTask(this.todo().id, name).subscribe({
      next: (updatedTodo) => {
        this.todosService.addSubtaskToStore(updatedTodo);
      },
    });
  } //bug

  deleteSubtask(taskId: string): void {
    this.todosService.deleteSubTask(this.todo().id, taskId).subscribe({
      next: () => {
        this.todosService.deleteSubTaskFromStore(this.todo().id, taskId);
      },
    });
  }

  toggleSubtask(sub: FormGroup): void {
    const { id, name, completed } = sub.value;
    this.todosService.updateSubTask(this.todo().id, id, { name, completed });
    this.cancelEditing();
  }

  startEditing(taskId: string): void {
    this.editingIndex.set(taskId);
  }

  cancelEditing(): void {
    this.editingIndex.set(null);
  }

  saveSubtask(sub: FormGroup): void {
    const { id, name, completed } = sub.value;
    this.todosService.updateSubTask(this.todo().id, id, { name, completed }).subscribe({
      next: (updatedTodo) => {
        this.todosService.updateTodoInStore(updatedTodo);
        this.cancelEditing();
      },
    });
    this.cancelEditing();
  }
}
