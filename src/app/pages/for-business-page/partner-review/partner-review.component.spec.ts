import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerReviewComponent } from './partner-review.component';

describe('PartnerReviewComponent', () => {
  let component: PartnerReviewComponent;
  let fixture: ComponentFixture<PartnerReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartnerReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartnerReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
