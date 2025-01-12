import { TestBed } from '@angular/core/testing';

import { MyEmailAlertsService } from './my-email-alerts.service';

describe('MyEamilAlertsService', () => {
  let service: MyEmailAlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyEmailAlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
