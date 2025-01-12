import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedMenuComponent } from './pinned-menu.component';

describe('PinnedMenuComponent', () => {
  let component: PinnedMenuComponent;
  let fixture: ComponentFixture<PinnedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinnedMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
