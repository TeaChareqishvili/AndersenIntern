import { TestBed } from '@angular/core/testing';
import { RessetPasswordService } from './resset-password.service';

describe('RessetPasswordService', () => {
  let service: RessetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RessetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
