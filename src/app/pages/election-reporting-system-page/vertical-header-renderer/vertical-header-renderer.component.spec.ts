import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalHeaderRendererComponent } from './vertical-header-renderer.component';

describe('VerticalHeaderRendererComponent', () => {
  let component: VerticalHeaderRendererComponent;
  let fixture: ComponentFixture<VerticalHeaderRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalHeaderRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalHeaderRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
