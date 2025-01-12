import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageErsComponent } from './manage-ers.component';

describe('ManageErsComponent', () => {
  let component: ManageErsComponent;
  let fixture: ComponentFixture<ManageErsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageErsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageErsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
