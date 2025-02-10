import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLocationDetailsComponent } from './business-location-details.component';

describe('BusinessLocationDetailsComponent', () => {
  let component: BusinessLocationDetailsComponent;
  let fixture: ComponentFixture<BusinessLocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessLocationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
