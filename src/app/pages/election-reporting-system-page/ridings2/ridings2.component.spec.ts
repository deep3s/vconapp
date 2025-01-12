import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ridings2Component } from './ridings2.component';

describe('Ridings2Component', () => {
  let component: Ridings2Component;
  let fixture: ComponentFixture<Ridings2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ridings2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ridings2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
