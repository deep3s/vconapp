import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogMembershipsPageComponent } from './catalog-memberships-page.component';

describe('CatalogMembershipsPageComponent', () => {
  let component: CatalogMembershipsPageComponent;
  let fixture: ComponentFixture<CatalogMembershipsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogMembershipsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogMembershipsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
