import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCard } from './todo-card';
import { fakeSubTask, fakeTodo } from '../models/test-mock-data';

describe('TodoCard', () => {
  let component: TodoCard;
  let fixture: ComponentFixture<TodoCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoCard);
    component = fixture.componentInstance;

    const todoWithSubtask = {
      ...fakeTodo,
      tasks: [fakeSubTask],
    };
    fixture.componentRef.setInput('todo', todoWithSubtask);
    fixture.componentRef.setInput('taskLoading', false);
    fixture.componentRef.setInput('confirmedTaskUpdate', null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create subtasks from todo input', () => {
    expect(component.subtasks.length).toBe(1);
    expect(component.subtasks.at(0).getRawValue()).toEqual(fakeSubTask);
  });

  it('should emit addSubtask with  name', () => {
    spyOn(component.addSubtask, 'emit');
    component.onAddSubTask({ name: fakeSubTask.name });
    expect(component.addSubtask.emit).toHaveBeenCalledOnceWith({
      todoId: fakeTodo.id,
      name: fakeSubTask.name,
    });
  });

  it('should not emit addSubtask when taskLoading is true', () => {
    spyOn(component.addSubtask, 'emit');
    fixture.componentRef.setInput('taskLoading', true);
    fixture.detectChanges();
    component.onAddSubTask({ name: fakeSubTask.name });
    expect(component.addSubtask.emit).not.toHaveBeenCalledTimes(1);
  });

  it('should emit updateSubtask when saving subtask', () => {
    spyOn(component.updateSubtask, 'emit');
    component.onSaveSubtask(component.subtasks.at(0));
    expect(component.updateSubtask.emit).toHaveBeenCalledOnceWith({
      todoId: fakeTodo.id,
      taskId: fakeSubTask.id,
      payload: { name: fakeSubTask.name, completed: fakeSubTask.completed },
    });
  });

  it('should emit deleteTask and reset edit mode', () => {
    spyOn(component.deleteTask, 'emit');
    component.editingIndex.set(fakeSubTask.id);
    component.onDeleteSubtask(fakeSubTask.id);
    expect(component.deleteTask.emit).toHaveBeenCalledOnceWith({
      todoId: fakeTodo.id,
      taskId: fakeSubTask.id,
    });
    expect(component.editingIndex()).toBeNull();
  });

  it('should close edit mode when parent confirms update', () => {
    component.startEditing(fakeSubTask.id);
    fixture.componentRef.setInput('confirmedTaskUpdate', {
      todoId: fakeTodo.id,
      taskId: fakeSubTask.id,
      token: Date.now(),
    });
    fixture.detectChanges();
    expect(component.editingIndex()).toBeNull();
  });
});
