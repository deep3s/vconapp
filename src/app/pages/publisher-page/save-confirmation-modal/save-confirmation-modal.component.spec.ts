import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherModalComponent } from './user-modal.component';

describe('VideoPlayerModalComponent', () => {
  let component: PublisherModalComponent;
  let fixture: ComponentFixture<PublisherModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublisherModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublisherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
