import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineBookingComponent } from './online-booking.component';

describe('OnlineBookingComponent', () => {
  let component: OnlineBookingComponent;
  let fixture: ComponentFixture<OnlineBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnlineBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
