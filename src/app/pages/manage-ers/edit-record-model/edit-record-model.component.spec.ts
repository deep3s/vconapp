import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecordModelComponent } from './edit-record-model.component';

describe('EditRecordModelComponent', () => {
  let component: EditRecordModelComponent;
  let fixture: ComponentFixture<EditRecordModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRecordModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecordModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
