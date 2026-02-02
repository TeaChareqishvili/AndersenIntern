import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login';
import { AuthResponse } from '../../models/auth.models';
import { NEVER, of } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { AUTH_ROUTES } from '../../app.routes';
import { ResponseMessageService } from '../../services/response-message/response-message.service';
import { signal } from '@angular/core';
import { AuthUserService } from '../../services/auth-user-service/auth-user-service.service';

const fakeData: AuthResponse = {
  email: 'tea@gmail.com',
  password: 'Tea12345',
};

const fakeAuthService = {
  signInUser: jasmine.createSpy('signInUser').and.returnValue(of(fakeData)),
  ressetPassword: jasmine.createSpy('ressetPassword').and.returnValue(of(null)),
};

const fakeResponseMessageService = {
  success: jasmine.createSpy('success').and.returnValue(of(null)),
};

const fakeUserService = {
  user: signal(null),
  setUser: jasmine.createSpy('setUser'),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: ResponseMessageService, useValue: fakeResponseMessageService },
        { provide: AuthUserService, useValue: fakeUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    fakeAuthService.signInUser.and.returnValue(NEVER);
    fakeAuthService.ressetPassword.and.returnValue(NEVER);
    fakeResponseMessageService.success.calls.reset();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when login is submitted we expect loader to be true', () => {
    component.onLogin(fakeData);
    expect(component.loading()).toBeTrue();
  });

  it('when password reset is submitted we expect loader to be true', () => {
    component.onResetPassword(fakeData);
    expect(component.loading()).toBeTrue();
  });

  it('when sign in is successful loader expected to be false', () => {
    fakeAuthService.signInUser.and.returnValue(of(null));
    component.onLogin(fakeData);
    expect(component.loading()).toBeFalse();
  });

  it('when reset password is successful loader expected to be false', () => {
    fakeAuthService.ressetPassword.and.returnValue(of(null));
    component.onResetPassword(fakeData);
    expect(component.loading()).toBeFalse();
  });

  it('if success when sign in  it should show snackbar with  `Welcome ${fakeData.email} 🎉` and navigate to user page', () => {
    fakeAuthService.signInUser.and.returnValue(of(fakeData));
    component.onLogin(fakeData);

    expect(fakeResponseMessageService.success).toHaveBeenCalledWith({
      message: `Welcome ${fakeData.email} 🎉`,
      navigateTo: AUTH_ROUTES.USER,
    });
  });

  it("creates the form with 'email' and 'password'", () => {
    expect(component.form).toBeTruthy();

    ['email', 'password'].forEach((controlName) => {
      expect(component.form.get(controlName)).toBeTruthy();
    });
  });

  it("if success with resset password  it should show snackbar with 'Password reset link sent to your email 📩'", () => {
    fakeAuthService.ressetPassword.and.returnValue(of(null));
    component.onResetPassword(fakeData);

    expect(fakeResponseMessageService.success).toHaveBeenCalledWith({
      message: 'Password reset link sent to your email 📩',
    });
  });

  it('should set  user data on log in ', () => {
    fakeAuthService.signInUser.and.returnValue(of(fakeData));
    component.onLogin(fakeData);
    expect(fakeUserService.setUser).toHaveBeenCalledWith(fakeData);
  });
});
