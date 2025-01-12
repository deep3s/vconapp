import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerSearchComponentComponent } from './trigger-search-component.component';

describe('TriggerSearchComponentComponent', () => {
  let component: TriggerSearchComponentComponent;
  let fixture: ComponentFixture<TriggerSearchComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerSearchComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerSearchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
