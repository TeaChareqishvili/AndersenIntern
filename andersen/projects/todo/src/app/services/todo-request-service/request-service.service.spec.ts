import { TestBed } from '@angular/core/testing';
import { RequestServiceTodo } from './request-service.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BASE_URL } from '@env';

describe('RequestServiceTodo', () => {
  let service: RequestServiceTodo;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BASE_URL, useValue: 'token' },
      ],
    });
    service = TestBed.inject(RequestServiceTodo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
