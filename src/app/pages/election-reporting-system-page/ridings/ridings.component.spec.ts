import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidingsComponent } from './ridings.component';

describe('RidingsComponent', () => {
  let component: RidingsComponent;
  let fixture: ComponentFixture<RidingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RidingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RidingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
