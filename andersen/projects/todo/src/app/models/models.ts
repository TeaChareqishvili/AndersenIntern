import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface BaseFileds {
  id: string;
  title: string;
}

export interface SubTask extends BaseFileds {
  completed: boolean;
}

export interface Todo extends BaseFileds {
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
