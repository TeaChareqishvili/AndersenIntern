import { TestBed } from '@angular/core/testing';
import { TodoHistoryEventService } from './todo-history-event.service';

describe('TodoHistoryEventService', () => {
  let service: TodoHistoryEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoHistoryEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
