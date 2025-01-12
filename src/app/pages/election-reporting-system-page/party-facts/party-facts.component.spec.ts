import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartyFactsComponent } from './party-facts.component';

describe('PartyFactsComponent', () => {
  let component: PartyFactsComponent;
  let fixture: ComponentFixture<PartyFactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartyFactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartyFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
