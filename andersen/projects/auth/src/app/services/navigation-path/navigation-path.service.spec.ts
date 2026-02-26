import { TestBed } from '@angular/core/testing';

import { NavigationPathService } from './navigation-path.service';

describe('NavigationPathService', () => {
  let service: NavigationPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
