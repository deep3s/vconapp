import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSetupDetailsPageComponent } from './business-setup-details-page.component';

describe('BusinessSetupDetailsPageComponent', () => {
  let component: BusinessSetupDetailsPageComponent;
  let fixture: ComponentFixture<BusinessSetupDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSetupDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessSetupDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
