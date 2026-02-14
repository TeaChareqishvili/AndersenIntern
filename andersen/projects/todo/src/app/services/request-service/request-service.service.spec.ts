import { TestBed } from '@angular/core/testing';
import { RequestServiceTodo } from './request-service.service';

describe('RequestServiceTodo', () => {
  let service: RequestServiceTodo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestServiceTodo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
