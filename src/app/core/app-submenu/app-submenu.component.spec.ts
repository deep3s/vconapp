import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSubmenuComponent } from './app-submenu.component';

describe('AppSubmenuComponent', () => {
  let component: AppSubmenuComponent;
  let fixture: ComponentFixture<AppSubmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSubmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
