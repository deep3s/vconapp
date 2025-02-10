import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAppointmentPageComponent } from './sales-appointment-page.component';

describe('SalesAppointmentPageComponent', () => {
  let component: SalesAppointmentPageComponent;
  let fixture: ComponentFixture<SalesAppointmentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesAppointmentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesAppointmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
