import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesBookingsPageComponent } from './services-bookings-page.component';

describe('ServicesBookingsPageComponent', () => {
  let component: ServicesBookingsPageComponent;
  let fixture: ComponentFixture<ServicesBookingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesBookingsPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesBookingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
