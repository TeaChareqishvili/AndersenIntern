import { TestBed } from '@angular/core/testing';
import { HeaderActionsOrchestratorService } from './header-actions-orchestrator.service';

describe('HeaderActionsOrchestratorService', () => {
  let service: HeaderActionsOrchestratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderActionsOrchestratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
