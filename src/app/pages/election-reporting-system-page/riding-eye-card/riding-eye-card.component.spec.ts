import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidingEyeCardComponent } from './riding-eye-card.component';

describe('RidingEyeCardComponent', () => {
  let component: RidingEyeCardComponent;
  let fixture: ComponentFixture<RidingEyeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidingEyeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidingEyeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
