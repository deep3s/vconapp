import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillingDetailsComponent } from './edit-billing-details.component';

describe('EditBillingDetailsComponent', () => {
  let component: EditBillingDetailsComponent;
  let fixture: ComponentFixture<EditBillingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBillingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBillingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
