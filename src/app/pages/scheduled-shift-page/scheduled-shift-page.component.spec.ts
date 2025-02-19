import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledShiftPageComponent } from './scheduled-shift-page.component';

describe('ScheduledShiftPageComponent', () => {
  let component: ScheduledShiftPageComponent;
  let fixture: ComponentFixture<ScheduledShiftPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledShiftPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledShiftPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
