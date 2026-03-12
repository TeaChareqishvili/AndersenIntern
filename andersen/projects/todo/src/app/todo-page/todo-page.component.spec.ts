import { UpdateSubTask } from './../models/models';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPageComponent } from './todo-page.component';
import { NEVER, of, throwError } from 'rxjs';
import { TodoUpdateService } from '../services/todo-service-update/todo-update.service';

import { fakeSubTask, fakeTodo } from '../models/test-mock-data';

describe('TodoPageComponent', () => {
  let component: TodoPageComponent;
  let fixture: ComponentFixture<TodoPageComponent>;

  function getAsyncCalls(): Array<() => void> {
    return [
      () => component.ngOnInit(),
      () => component.deleteTodo(fakeTodo.id),
      () =>
        component.addSubtask({
          todoId: fakeTodo.id,
          name: fakeSubTask.name,
        }),
      () =>
        component.updateSubtask({
          todoId: fakeTodo.id,
          taskId: fakeSubTask.id,
          payload: {
            name: fakeSubTask.name,
            completed: fakeSubTask.completed,
          },
        }),
      () =>
        component.deleteSubtask({
          todoId: fakeTodo.id,
          taskId: fakeSubTask.id,
        }),
    ];
  }

  const fakeTodoService = jasmine.createSpyObj('TodoService', [
    'todos',
    'getTodoList',
    'removeTodo',
    'addSubtask',
    'updateTask',
    'deleteSubTask',
  ]);

  beforeEach(async () => {
    fakeTodoService.removeTodo.calls.reset();
    fakeTodoService.addSubtask.calls.reset();
    fakeTodoService.updateTask.calls.reset();
    fakeTodoService.deleteSubTask.calls.reset();

    fakeTodoService.todos.and.returnValue([]);
    fakeTodoService.getTodoList.and.returnValue(of([]));
    fakeTodoService.removeTodo.and.returnValue(of([]));
    fakeTodoService.addSubtask.and.returnValue(of([]));
    fakeTodoService.updateTask.and.returnValue(of([]));
    fakeTodoService.deleteSubTask.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [TodoPageComponent],
      providers: [{ provide: TodoUpdateService, useValue: fakeTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoPageComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loader true when any request is submited', () => {
    Object.keys(fakeTodoService)
      .filter((method) => method !== 'todos')
      .forEach((method) => {
        fakeTodoService[method as keyof typeof fakeTodoService].and.returnValue(NEVER);
      });

    getAsyncCalls().forEach((call) => {
      call();
      expect(component.loader()).toBeTrue();
    });
  });

  it('should set loader false when any request is submited and return success', () => {
    Object.keys(fakeTodoService)
      .filter((method) => method !== 'todos')
      .forEach((method) => {
        fakeTodoService[method as keyof typeof fakeTodoService].and.returnValue(of(null));
      });

    getAsyncCalls().forEach((call) => {
      call();
      expect(component.loader()).toBeFalse();
    });
  });

  it('should set loader false when any request is submited and return error', () => {
    Object.keys(fakeTodoService)
      .filter((method) => method !== 'todos')
      .forEach((method) => {
        fakeTodoService[method as keyof typeof fakeTodoService].and.returnValue(
          throwError(() => new Error('API error')),
        );
      });

    getAsyncCalls().forEach((call) => {
      call();
      expect(component.loader()).toBeFalse();
    });
  });

  it('should delete todo', () => {
    fakeTodoService.removeTodo.and.returnValue(of(null));
    component.deleteTodo(fakeTodo.id);
    expect(fakeTodoService.removeTodo).toHaveBeenCalledOnceWith(fakeTodo.id);
    fakeTodoService.removeTodo.calls.reset();
  });

  it('should delete subtask', () => {
    fakeTodoService.deleteSubTask.and.returnValue(of(null));
    const payload = {
      todoId: fakeTodo.id,
      taskId: fakeSubTask.id,
    };
    component.deleteSubtask(payload);
    expect(fakeTodoService.deleteSubTask).toHaveBeenCalledOnceWith(fakeTodo.id, fakeSubTask.id);
  });

  it('should add new subtask', () => {
    fakeTodoService.addSubtask.and.returnValue(of(null));
    component.addSubtask({ todoId: fakeTodo.id, name: fakeSubTask.name });
    expect(fakeTodoService.addSubtask).toHaveBeenCalledOnceWith(fakeTodo.id, fakeSubTask.name);
  });

  it('should update subtask', () => {
    fakeTodoService.updateTask.and.returnValue(of(null));
    component.updateSubtask({
      todoId: fakeTodo.id,
      taskId: fakeSubTask.id,
      payload: {
        name: fakeSubTask.name,
        completed: fakeSubTask.completed,
      },
    });
    expect(fakeTodoService.updateTask).toHaveBeenCalledOnceWith(fakeTodo.id, fakeSubTask.id, {
      name: fakeSubTask.name,
      completed: fakeSubTask.completed,
    });
  });

  it('should get todo list', () => {
    fakeTodoService.getTodoList.and.returnValue(of(null));
    component.ngOnInit();
    expect(fakeTodoService.getTodoList).toHaveBeenCalled;
  });
});
