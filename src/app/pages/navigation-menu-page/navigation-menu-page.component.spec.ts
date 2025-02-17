import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMenuPageComponent } from './navigation-menu-page.component';

describe('NavigationMenuPageComponent', () => {
  let component: NavigationMenuPageComponent;
  let fixture: ComponentFixture<NavigationMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationMenuPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
