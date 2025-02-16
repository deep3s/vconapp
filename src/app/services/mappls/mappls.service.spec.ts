import { TestBed } from '@angular/core/testing';

import { MapplsService } from './mappls.service';

describe('MapplsService', () => {
  let service: MapplsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapplsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
