import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { AuthService } from './services/auth-service/auth.service';
import { NEVER, of } from 'rxjs';
import { AUTH_ROUTES } from './app.routes';
import { ResponseMessageService } from './services/response-message/response-message.service';
import { Router } from '@angular/router';
import { AuthUserService } from './services/auth-user-service/auth-user-service.service';
import { signal } from '@angular/core';

const fakeAuthService = {
  signOut: jasmine.createSpy('signOut').and.returnValue(of(null)),
};

const fakeResponseMessageService = {
  success: jasmine.createSpy('success').and.returnValue(of(null)),
};

const fakeUserService = {
  user: signal(null),
  setUser: jasmine.createSpy('setUser'),
};

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],

      providers: [
        { provide: AuthService, useValue: fakeAuthService },
        { provide: ResponseMessageService, useValue: fakeResponseMessageService },
        { provide: AuthUserService, useValue: fakeUserService },
      ],
    }).compileComponents();

    fakeAuthService.signOut.and.returnValue(NEVER);
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to login page on sign in click', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateToSignIn();
    expect(navigateSpy).toHaveBeenCalledWith([AUTH_ROUTES.LOGIN]);
  });

  it('should navigate to login page on sign up click', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateToSignUp();
    expect(navigateSpy).toHaveBeenCalledWith([AUTH_ROUTES.REGISTER]);
  });

  it('should set the loader to true when logging out is clicked', () => {
    component.onLogout();
    expect(component.loading()).toBeTrue();
  });

  it('when logout  is successful loader expected to be false', () => {
    fakeAuthService.signOut.and.returnValue(of(null));
    component.onLogout();
    expect(component.loading()).toBeFalse();
  });

  it("if success it should show snackbar with 'Logged out successfully 👋' and navigate to login page", () => {
    fakeAuthService.signOut.and.returnValue(of(null));
    component.onLogout();

    expect(fakeResponseMessageService.success).toHaveBeenCalledWith({
      message: 'Logged out successfully 👋',
      navigateTo: AUTH_ROUTES.LOGIN,
    });
  });

  it('should clear user data on logout', () => {
    fakeAuthService.signOut.and.returnValue(of(null));
    component.onLogout();
    expect(fakeUserService.setUser).toHaveBeenCalledWith(null);
  });
});
