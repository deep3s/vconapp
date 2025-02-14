import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddteamMembersPageComponent } from './addteam-members-page.component';

describe('AddteamMembersPageComponent', () => {
  let component: AddteamMembersPageComponent;
  let fixture: ComponentFixture<AddteamMembersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddteamMembersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddteamMembersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
