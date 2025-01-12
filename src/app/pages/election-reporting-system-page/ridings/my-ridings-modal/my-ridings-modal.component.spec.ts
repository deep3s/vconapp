import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRidingsModalComponent } from './user-modal.component';

describe('VideoPlayerModalComponent', () => {
  let component: MyRidingsModalComponent;
  let fixture: ComponentFixture<MyRidingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRidingsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRidingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
