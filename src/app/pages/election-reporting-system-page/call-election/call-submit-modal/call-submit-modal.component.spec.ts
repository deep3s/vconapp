import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallSubmitModalComponent } from './call-submit-modal.component';

describe('CallSubmitModalComponent', () => {
  let component: CallSubmitModalComponent;
  let fixture: ComponentFixture<CallSubmitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallSubmitModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallSubmitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
