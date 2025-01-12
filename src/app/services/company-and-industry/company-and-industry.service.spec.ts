import { TestBed } from '@angular/core/testing';

import { CompanyAndIndustry } from './my-email-alerts.service';

describe('MyEamilAlertsService', () => {
  let service: CompanyAndIndustry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyAndIndustry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
