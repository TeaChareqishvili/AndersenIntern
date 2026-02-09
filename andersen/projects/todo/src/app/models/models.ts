import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  subtasks: SubTask[];
}

export const createTodoGroup = () =>
  new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    subtasks: new FormArray<FormGroup>([]),
  });

export const createSubTaskGroup = () =>
  new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    completed: new FormControl(false, { nonNullable: true }),
  });
