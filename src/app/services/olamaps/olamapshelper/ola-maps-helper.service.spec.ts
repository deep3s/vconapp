import { TestBed } from '@angular/core/testing';

import { OlaMapsHelperService } from './ola-maps-helper.service';

describe('OlaMapsHelperService', () => {
  let service: OlaMapsHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OlaMapsHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
