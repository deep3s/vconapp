import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAlertModelComponent } from './delete-alert-model.component';

describe('DeleteAlertModelComponent', () => {
  let component: DeleteAlertModelComponent;
  let fixture: ComponentFixture<DeleteAlertModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAlertModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAlertModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
