import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthComponent } from './auth';
import { FormControl } from '@angular/forms';

const fakeData = {
  email: 'teaa@gmail.com',
  password: 'Tea12345$',
};

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let password!: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    password = component.form().get('password') as FormControl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' should check if email is valid', () => {
    const email = 'tea@gmail.com';
    expect(component.form().get(email)).toBeTrue();
  });

  it(' should check if password is valid', () => {
    const password = 'TTea12345$';
    expect(component.form().get(password)).toBeTrue();
  });

  it('should reject password shorter than 8 char', () => {
    password.setValue('Tea1$');
    expect(password.valid).toBeFalse();
  });

  it('should reject password without uppercase letter', () => {
    password.setValue('tea12345$');
    expect(password.valid).toBeFalse();
  });

  it('should reject password without  numbers', () => {
    password.setValue('TeaPassword$');
    expect(password.valid).toBeFalse();
  });

  it('should reject password without symbol', () => {
    password.setValue('Tea12345');
    expect(password.valid).toBeFalse();
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

    expect(component.submitUser.emit).toHaveBeenCalledWith(fakeData);
  });

  it('should reset the password value ', () => {
    spyOn(component.submitReset, 'emit');

    component.form().setValue({
      email: fakeData.email,
      password: fakeData.password,
    });

    component.onReset();

    expect(component.submitReset.emit).toHaveBeenCalledWith(fakeData);
  });
});
