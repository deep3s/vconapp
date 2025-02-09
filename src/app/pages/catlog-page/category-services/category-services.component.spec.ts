import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryServicesComponent } from './category-services.component';

describe('CategoryServicesComponent', () => {
  let component: CategoryServicesComponent;
  let fixture: ComponentFixture<CategoryServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
