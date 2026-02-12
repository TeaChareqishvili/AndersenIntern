import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export interface BaseFileds {
  id: string;
  name: string;
}

export interface SubTask extends BaseFileds {
  completed: boolean;
}

export interface Todo extends BaseFileds {
  tasks: SubTask[];
}

export interface UpdateSubTask {
  name?: string;
  completed?: boolean;
}

export const createTodoGroup = () =>
  new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    tasks: new FormArray<FormGroup>([]),
  });

export const createSubTaskGroup = () =>
  new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    completed: new FormControl(false, { nonNullable: true }),
  });
