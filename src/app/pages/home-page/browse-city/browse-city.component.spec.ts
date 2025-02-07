import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseCityComponent } from './browse-city.component';

describe('BrowseCityComponent', () => {
  let component: BrowseCityComponent;
  let fixture: ComponentFixture<BrowseCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrowseCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrowseCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
