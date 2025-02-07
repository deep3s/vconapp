import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatlogPageComponent } from './catlog-page.component';

describe('CatlogPageComponent', () => {
  let component: CatlogPageComponent;
  let fixture: ComponentFixture<CatlogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatlogPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatlogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
