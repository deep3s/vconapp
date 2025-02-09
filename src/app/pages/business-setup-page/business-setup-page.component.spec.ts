import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessSetupPageComponent } from './business-setup-page.component';

describe('BusinessSetupPageComponent', () => {
  let component: BusinessSetupPageComponent;
  let fixture: ComponentFixture<BusinessSetupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessSetupPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessSetupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
