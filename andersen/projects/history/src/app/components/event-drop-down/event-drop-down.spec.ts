import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDropDownComponent } from './event-drop-down';

describe('EventDropDownComponent', () => {
  let component: EventDropDownComponent;
  let fixture: ComponentFixture<EventDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDropDownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
