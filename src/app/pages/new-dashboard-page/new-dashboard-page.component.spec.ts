import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDashboardPageComponent } from './new-dashboard-page.component';

describe('NewDashboardPageComponent', () => {
  let component: NewDashboardPageComponent;
  let fixture: ComponentFixture<NewDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDashboardPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
