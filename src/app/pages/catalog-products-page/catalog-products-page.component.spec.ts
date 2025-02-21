import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogProductsPageComponent } from './catalog-products-page.component';

describe('CatalogProductsPageComponent', () => {
  let component: CatalogProductsPageComponent;
  let fixture: ComponentFixture<CatalogProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogProductsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
