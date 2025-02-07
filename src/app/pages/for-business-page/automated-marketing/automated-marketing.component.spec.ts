import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomatedMarketingComponent } from './automated-marketing.component';

describe('AutomatedMarketingComponent', () => {
  let component: AutomatedMarketingComponent;
  let fixture: ComponentFixture<AutomatedMarketingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomatedMarketingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomatedMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
