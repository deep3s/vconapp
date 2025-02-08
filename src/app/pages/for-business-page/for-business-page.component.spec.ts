import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForBusinessPageComponent } from './for-business-page.component';

describe('ForBusinessPageComponent', () => {
  let component: ForBusinessPageComponent;
  let fixture: ComponentFixture<ForBusinessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForBusinessPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForBusinessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
