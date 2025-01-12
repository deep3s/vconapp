import { TestBed } from '@angular/core/testing';

import { MyRidingsService } from './my-ridings.service';

describe('MyRidingsService', () => {
  let service: MyRidingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyRidingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
