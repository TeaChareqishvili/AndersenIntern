import { LoaderComponent } from '@ui';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  output,
  signal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Form } from '../form/form';
import { createTodoGroup, Todo } from '../models/models';
import { TodoUpdateService } from '../services/todo-service/todo-update.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [Form, ReactiveFormsModule, LoaderComponent],
  templateUrl: './todo-input.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInput {
  private readonly todoUpdateService = inject(TodoUpdateService);
  private readonly destroyRef = inject(DestroyRef);
  readonly form = createTodoGroup();
  readonly loader = signal(false);
  readonly newTodo = output<Todo[]>();

  onAddTodo({ name }: { name: string }): void {
    if (this.form.invalid || !name.trim()) {
      return;
    }

    this.loader.set(true);
    this.todoUpdateService
      .addTodo(name.trim())
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loader.set(false)),
      )
      .subscribe({
        next: (todos) => {
          this.newTodo.emit(todos);
          this.form.reset();
        },
      });
  }
}
