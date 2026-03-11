import { TestBed } from '@angular/core/testing';

import { TodoHistoryDialogBridgeService } from './todo-history-dialog-bridge.service';

describe('TodoHistoryDialogBridgeService', () => {
  let service: TodoHistoryDialogBridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoHistoryDialogBridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
