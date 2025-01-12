import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherThumbnailTooltipComponent } from './publisher-thumbnail-tooltip.component';

describe('PublisherThumbnailTooltipComponent', () => {
  let component: PublisherThumbnailTooltipComponent;
  let fixture: ComponentFixture<PublisherThumbnailTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublisherThumbnailTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublisherThumbnailTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
