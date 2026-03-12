import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoInput } from './todo-input';

import { TodoUpdateService } from '../services/todo-service-update/todo-update.service';
import { NEVER, of } from 'rxjs';
import { fakeTodo } from '../models/test-mock-data';

describe('TodoInputComponent', () => {
  let component: TodoInput;
  let fixture: ComponentFixture<TodoInput>;

  const fakeTodoService = {
    addTodo: jasmine.createSpy('addTodo'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoInput],
      providers: [{ provide: TodoUpdateService, useValue: fakeTodoService }],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoInput);
    component = fixture.componentInstance;
    fakeTodoService.addTodo.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loader true when add new todo is submited', () => {
    fakeTodoService.addTodo.and.returnValue(NEVER);
    component.onAddTodo({ name: fakeTodo.name });
    expect(component.loader()).toBeTrue();
  });

  it('should set loader to false after adding new todo', () => {
    fakeTodoService.addTodo.and.returnValue(of([fakeTodo]));
    component.onAddTodo({ name: fakeTodo.name });
    expect(component.loader()).toBeFalse();
  });

  it('should call addTodo with submitted todo name', () => {
    fakeTodoService.addTodo.and.returnValue(of([fakeTodo]));
    spyOn(component.newTodo, 'emit');
    component.onAddTodo({ name: fakeTodo.name });
    expect(fakeTodoService.addTodo).toHaveBeenCalledOnceWith(fakeTodo.name);
    expect(component.newTodo.emit).toHaveBeenCalledOnceWith([fakeTodo]);
  });
});
