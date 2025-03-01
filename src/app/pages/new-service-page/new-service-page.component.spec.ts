import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewServicePageComponent } from './new-service-page.component';

describe('NewServicePageComponent', () => {
  let component: NewServicePageComponent;
  let fixture: ComponentFixture<NewServicePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewServicePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewServicePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
