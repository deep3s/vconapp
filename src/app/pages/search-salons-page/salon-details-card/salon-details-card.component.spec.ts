import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonDetailsCardComponent } from './salon-details-card.component';

describe('SalonDetailsCardComponent', () => {
  let component: SalonDetailsCardComponent;
  let fixture: ComponentFixture<SalonDetailsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonDetailsCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
