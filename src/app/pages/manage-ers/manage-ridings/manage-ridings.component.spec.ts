import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRidingsComponent } from './manage-ridings.component';

describe('ManageRidingsComponent', () => {
  let component: ManageRidingsComponent;
  let fixture: ComponentFixture<ManageRidingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageRidingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRidingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
