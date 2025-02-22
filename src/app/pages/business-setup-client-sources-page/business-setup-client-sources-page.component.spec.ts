import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSetupClientSourcesPageComponent } from './business-setup-client-sources-page.component';

describe('BusinessSetupClientSourcesPageComponent', () => {
  let component: BusinessSetupClientSourcesPageComponent;
  let fixture: ComponentFixture<BusinessSetupClientSourcesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSetupClientSourcesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessSetupClientSourcesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
