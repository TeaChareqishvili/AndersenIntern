import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

import { Router } from '@angular/router';
import { signal } from '@angular/core';

export const createFakeUserService = () => ({
  user: signal(null),
  setUser: jasmine.createSpy('setUser'),
});

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let router: Router;
  let fakeUserService: ReturnType<typeof createFakeUserService>;

  beforeEach(async () => {
    fakeUserService = createFakeUserService();
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
