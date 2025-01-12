import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnElectedComponent } from './un-elected.component';

describe('UnElectedComponent', () => {
  let component: UnElectedComponent;
  let fixture: ComponentFixture<UnElectedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnElectedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnElectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
