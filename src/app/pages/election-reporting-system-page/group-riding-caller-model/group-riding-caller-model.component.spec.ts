import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupRidingCallerModelComponent } from './group-riding-caller-model.component';

describe('GroupRidingCallerModelComponent', () => {
  let component: GroupRidingCallerModelComponent;
  let fixture: ComponentFixture<GroupRidingCallerModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupRidingCallerModelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupRidingCallerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
