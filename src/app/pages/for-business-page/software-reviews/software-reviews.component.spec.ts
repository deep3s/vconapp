import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareReviewsComponent } from './software-reviews.component';

describe('SoftwareReviewsComponent', () => {
  let component: SoftwareReviewsComponent;
  let fixture: ComponentFixture<SoftwareReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareReviewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
