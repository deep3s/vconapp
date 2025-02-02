import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonCardsComponent } from './salon-cards.component';

describe('SalonCardsComponent', () => {
  let component: SalonCardsComponent;
  let fixture: ComponentFixture<SalonCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonCardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
