import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form } from './form';
import { fakeTodo } from '../todo-input/todo-input.spec';
import { createTodoGroup } from '../models/models';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FormComponent', () => {
  let component: Form;
  let fixture: ComponentFixture<Form>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Form],
      providers: [provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(Form);
    fixture.componentRef.setInput('form', createTodoGroup());
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name value should not be empty', () => {
    const form = component.form().get('name');
    form?.setValue('');
    expect(form?.invalid).toBeTrue();
  });

  it('should submit the form values', () => {
    spyOn(component.todoSubmitted, 'emit');
    component.form().patchValue({
      name: fakeTodo.name,
    });
    component.onSubmit();

    expect(component.todoSubmitted.emit).toHaveBeenCalledWith({ name: fakeTodo.name });
  });

  it('should expext to reset form after submit', () => {
    spyOn(component.todoSubmitted, 'emit');
    component.onSubmit();
    expect(component.form().reset());
  });

  it('creates form with name', () => {
    expect(component.form).toBeTruthy();
    expect(component.form().contains('name')).toBeTrue();
  });
});
