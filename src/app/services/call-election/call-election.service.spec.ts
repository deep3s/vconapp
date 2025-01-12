import { TestBed } from '@angular/core/testing';

import { CallElectionService } from './call-election.service';

describe('CallElectionService', () => {
  let service: CallElectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallElectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
