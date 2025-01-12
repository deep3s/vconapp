import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallCancelSubmitModalComponent } from './call-cancel-submit-modal.component';

describe('CallCancelSubmitModalComponent', () => {
  let component: CallCancelSubmitModalComponent;
  let fixture: ComponentFixture<CallCancelSubmitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallCancelSubmitModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallCancelSubmitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
