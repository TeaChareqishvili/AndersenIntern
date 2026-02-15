import { LoaderComponent } from '@ui';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Form } from '../form/form';
import { createTodoGroup } from '../models/models';
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

  onAddTodo(): void {
    this.loader.set(true);
    if (this.form.valid) {
      this.todoUpdateService
        .addTodo(this.form.value.name!)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.loader.set(false)),
        )
        .subscribe({});
      this.form.reset();
    }
  }
}
