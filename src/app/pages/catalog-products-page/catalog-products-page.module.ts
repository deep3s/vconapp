import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogProductsPageRoutingModule } from './catalog-products-page-routing.module';
import { CatalogProductsPageComponent } from './catalog-products-page.component';


@NgModule({
  declarations: [
    CatalogProductsPageComponent
  ],
  imports: [
    CommonModule,
    CatalogProductsPageRoutingModule
  ]
})
export class CatalogProductsPageModule { }
