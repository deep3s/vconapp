import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallElectionComponent } from './call-election.component';

describe('CallElectionComponent', () => {
  let component: CallElectionComponent;
  let fixture: ComponentFixture<CallElectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallElectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
