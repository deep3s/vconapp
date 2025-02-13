import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessLocationPageComponent } from './business-location-page.component';

describe('BusinessLocationPageComponent', () => {
  let component: BusinessLocationPageComponent;
  let fixture: ComponentFixture<BusinessLocationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessLocationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessLocationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
