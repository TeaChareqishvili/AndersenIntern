import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoHistoryDetailsDialog } from './todo-history-details-dialog';

describe('TodoHistoryDetailsDialog', () => {
  let component: TodoHistoryDetailsDialog;
  let fixture: ComponentFixture<TodoHistoryDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoHistoryDetailsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoHistoryDetailsDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
