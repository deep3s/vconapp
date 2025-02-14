import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLocationAddressComponent } from './business-location-address.component';

describe('BusinessLocationAddressComponent', () => {
  let component: BusinessLocationAddressComponent;
  let fixture: ComponentFixture<BusinessLocationAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessLocationAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessLocationAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
