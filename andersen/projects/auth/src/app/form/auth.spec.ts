import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth';

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { createAuthForm } from '../models/auth.models';
import { fakeData } from '../pages/register/register.spec';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
      providers: [provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('form', createAuthForm());
    fixture.componentRef.setInput('title', 'text');
    fixture.componentRef.setInput('submitText', 'submit text');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('email value should not be empty', () => {
    const form = component.form().get('email');
    form?.setValue('');
    expect(form?.invalid).toBeTrue();
  });

  it('password value should not be empty', () => {
    const form = component.form().get('password');
    form?.setValue('');
    expect(form?.invalid).toBeTrue();
  });

  it("creates the form with 'email' and 'password'", () => {
    expect(component.form).toBeTruthy();

    ['email', 'password'].forEach((controlName) => {
      expect(component.form().get(controlName)).toBeTruthy();
    });
  });

  it('should submit the form values', () => {
    spyOn(component.submitUser, 'emit');

    component.form().setValue({
      email: fakeData.email,
      password: fakeData.password,
    });

    component.onSubmit();

    expect(component.submitUser.emit).toHaveBeenCalledOnceWith(fakeData);
  });

  it('should reset the password value ', () => {
    spyOn(component.submitReset, 'emit');

    component.form().setValue({
      email: fakeData.email,
      password: fakeData.password,
    });

    component.onReset();

    expect(component.submitReset.emit).toHaveBeenCalledOnceWith(fakeData);
  });
});
