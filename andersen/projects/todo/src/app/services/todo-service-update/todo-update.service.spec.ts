import { TestBed } from '@angular/core/testing';
import { TodoUpdateService } from './todo-update.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BASE_URL } from '@env';

describe('TodoUpdateService', () => {
  let service: TodoUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BASE_URL, useValue: 'token' },
      ],
    });
    service = TestBed.inject(TodoUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
