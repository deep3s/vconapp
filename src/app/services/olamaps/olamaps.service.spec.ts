import { TestBed } from '@angular/core/testing';

import { OlamapsService } from './olamaps.service';

describe('MapplsService', () => {
  let service: OlamapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlamapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
