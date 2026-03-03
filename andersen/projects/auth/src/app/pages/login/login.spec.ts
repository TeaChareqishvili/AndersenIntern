import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { LoginComponent } from './login';

import { of } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';

import { AuthUserService, LoadingService } from '@shared';
import { createFakeUserService } from '../../app.spec';
import { fakeData } from '../register/register.spec';
import { ResponseMessageService } from '@shared';
import { AUTH_ROUTES } from '@auth/app/auth.routes';

const fakeAuthService = {
  signInUser: jasmine.createSpy('signInUser'),
  ressetPassword: jasmine.createSpy('ressetPassword'),
};

const fakeResponseMessageService = {
  success: jasmine.createSpy('success').and.returnValue(of(null)),
};
const loadingSignal = signal(false);
const fakeLoadingService = {
  isLoading: loadingSignal.asReadonly(),
};

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let fakeUserService: ReturnType<typeof createFakeUserService>;

  beforeEach(async () => {
    fakeUserService = createFakeUserService();
    loadingSignal.set(false);
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: ResponseMessageService, useValue: fakeResponseMessageService },
        { provide: AuthUserService, useValue: fakeUserService },
        { provide: LoadingService, useValue: fakeLoadingService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    fakeResponseMessageService.success.calls.reset();
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reflects shared loader state when loading is true', () => {
    loadingSignal.set(true);
    expect(component.loading()).toBeTrue();
  });

  it('reflects shared loader state when loading is false', () => {
    loadingSignal.set(false);
    expect(component.loading()).toBeFalse();
  });

  it('if success when sign in  it should show snackbar with  `Welcome ${fakeData.email} 🎉` and navigate to user page', () => {
    fakeAuthService.signInUser.and.returnValue(of(fakeData));
    component.onLogin(fakeData);

    expect(fakeResponseMessageService.success).toHaveBeenCalledOnceWith({
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

  it("if success with reset password  it should show snackbar with 'Password reset link sent to your email 📩'", () => {
    fakeAuthService.ressetPassword.and.returnValue(of(null));
    component.onResetPassword(fakeData);

    expect(fakeResponseMessageService.success).toHaveBeenCalledOnceWith({
      message: 'Password reset link sent to your email 📩',
    });
  });

  it('should set  user data on log in ', () => {
    fakeAuthService.signInUser.and.returnValue(of(fakeData));
    component.onLogin(fakeData);
    expect(fakeUserService.setUser).toHaveBeenCalledOnceWith(fakeData);
  });
});
