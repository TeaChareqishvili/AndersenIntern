import { TestBed } from '@angular/core/testing';

import { LogOutServiceService } from './log-out-service.service';

describe('LogOutServiceService', () => {
  let service: LogOutServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogOutServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
