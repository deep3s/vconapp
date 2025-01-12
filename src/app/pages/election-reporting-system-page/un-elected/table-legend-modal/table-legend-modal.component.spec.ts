import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLegendModalComponent } from './table-legend-modal.component';

describe('TableLegendModalComponent', () => {
  let component: TableLegendModalComponent;
  let fixture: ComponentFixture<TableLegendModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableLegendModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLegendModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
