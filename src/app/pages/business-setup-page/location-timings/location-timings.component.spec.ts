import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTimingsComponent } from './location-timings.component';

describe('LocationTimingsComponent', () => {
  let component: LocationTimingsComponent;
  let fixture: ComponentFixture<LocationTimingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTimingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
