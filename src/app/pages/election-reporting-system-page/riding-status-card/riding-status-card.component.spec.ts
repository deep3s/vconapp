import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidingStatusCardComponent } from './riding-status-card.component';

describe('RidingStatusCardComponent', () => {
  let component: RidingStatusCardComponent;
  let fixture: ComponentFixture<RidingStatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidingStatusCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidingStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
