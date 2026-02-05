import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { TodoService } from '../services/storage-service.service';
import { createTodoForm, Todo } from '../models/models';
import { Form } from '../form/form';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

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
    Form,
  ],
  templateUrl: './todo-card.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCard {
  form = createTodoForm();
  todo = input.required<Todo>();
  editingSubtaskId = signal<string | null>(null);
  editSubtaskTitle = signal<string>('');

  private readonly todoService = inject(TodoService);

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todo().id);
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo().id);
  }

  addSubtask(title: string): void {
    this.todoService.addSubtask(this.todo().id, title);
  }

  deleteSubtask(subId: string): void {
    this.todoService.deleteSubtask(this.todo().id, subId);
  }

  startEditingSubtask(subId: string, currentTitle: string): void {
    this.editingSubtaskId.set(subId);
    this.editSubtaskTitle.set(currentTitle);
  }

  saveSubtask(subId: string): void {
    const title = this.editSubtaskTitle().trim();
    if (title) {
      this.todoService.updateSubtask(this.todo().id, subId, title);
    }
    this.cancelEditing();
  }

  cancelEditing(): void {
    this.editingSubtaskId.set(null);
    this.editSubtaskTitle.set('');
  }
}
