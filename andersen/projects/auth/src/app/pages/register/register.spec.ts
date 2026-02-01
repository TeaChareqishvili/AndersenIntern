import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register';
import { AuthResponse } from '../../models/auth.models';
import { NEVER, of } from 'rxjs';
import { AuthService } from '../../services/auth-service/auth.service';
import { ResponseMessageService } from '../../services/response-message/response-message.service';
import { AUTH_ROUTES } from '../../app.routes';

const fakeData: AuthResponse = {
  email: 'tea@gmail.com',
  password: 'Tea12345',
};

const fakeAuthService = {
  registerUser: jasmine.createSpy('registerUser').and.returnValue(of(null)),
};

const fakeResponseMessageService = {
  success: jasmine.createSpy('success').and.returnValue(of(null)),
};

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: ResponseMessageService, useValue: fakeResponseMessageService },
      ],
    }).compileComponents();

    fakeAuthService.registerUser.and.returnValue(NEVER);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when registration submited we expect loader to be true', () => {
    component.onRegister(fakeData);
    expect(component.loading()).toBeTrue();
  });

  it('when registration is successful loader expected to be false', () => {
    fakeAuthService.registerUser.and.returnValue(of(null));
    component.onRegister(fakeData);
    expect(component.loading()).toBeFalse();
  });

  it("creates the form with 'email' and 'password'", () => {
    expect(component.form).toBeTruthy();

    ['email', 'password'].forEach((controlName) => {
      expect(component.form.get(controlName)).toBeTruthy();
    });
  });

  it("if success it should show snackbar with 'Registration successful 🎉' and navigate to login page", () => {
    fakeAuthService.registerUser.and.returnValue(of(null));
    component.onRegister(fakeData);

    expect(fakeResponseMessageService.success).toHaveBeenCalledWith({
      message: 'Registration successful 🎉',
      navigateTo: AUTH_ROUTES.LOGIN,
    });
  });
});
