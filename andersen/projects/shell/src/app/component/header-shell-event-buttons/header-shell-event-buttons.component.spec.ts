import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderShellEventButtons } from './header-shell-event-buttons';

describe('HeaderShellEventButtons', () => {
  let component: HeaderShellEventButtons;
  let fixture: ComponentFixture<HeaderShellEventButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderShellEventButtons],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderShellEventButtons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
