import { TestBed } from '@angular/core/testing';
import { HeaderSlotService } from './header-service.service';

describe('HeaderSlotService', () => {
  let service: HeaderSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
