import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledShiftsPageComponent } from './scheduled-shifts-page.component';

describe('ScheduledShiftsPageComponent', () => {
  let component: ScheduledShiftsPageComponent;
  let fixture: ComponentFixture<ScheduledShiftsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledShiftsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledShiftsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
