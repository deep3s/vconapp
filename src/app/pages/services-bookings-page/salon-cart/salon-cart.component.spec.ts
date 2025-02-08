import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonCartComponent } from './salon-cart.component';

describe('SalonCartComponent', () => {
  let component: SalonCartComponent;
  let fixture: ComponentFixture<SalonCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalonCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
