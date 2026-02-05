import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  subtasks: SubTask[];
}

export const createTodoForm = () =>
  new FormGroup({
    todo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
