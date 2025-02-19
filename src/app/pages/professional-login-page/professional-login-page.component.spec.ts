import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalLoginPageComponent } from './professional-login-page.component';

describe('ProfessionalLoginPageComponent', () => {
  let component: ProfessionalLoginPageComponent;
  let fixture: ComponentFixture<ProfessionalLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalLoginPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
