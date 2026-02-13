import { TestBed } from '@angular/core/testing';
import { TodoUpdateService } from './todo-update.service';

describe('TodoUpdateService', () => {
  let service: TodoUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
