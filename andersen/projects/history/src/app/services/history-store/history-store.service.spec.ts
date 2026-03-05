import { TestBed } from '@angular/core/testing';
import { HistoryStoreService } from './history-store.service';

describe('HistoryStoreService', () => {
  let service: HistoryStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
