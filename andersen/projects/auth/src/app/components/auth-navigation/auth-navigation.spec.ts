import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNavigation } from './auth-navigation';

describe('AuthNavigation', () => {
  let component: AuthNavigation;
  let fixture: ComponentFixture<AuthNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthNavigation],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
