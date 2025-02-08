import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailsPageComponent } from './business-details-page.component';

describe('BusinessDetailsPageComponent', () => {
  let component: BusinessDetailsPageComponent;
  let fixture: ComponentFixture<BusinessDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
