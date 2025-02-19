import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogMembershipsPageRoutingModule } from './catalog-memberships-page-routing.module';
import { CatalogMembershipsPageComponent } from './catalog-memberships-page.component';


@NgModule({
  declarations: [
    CatalogMembershipsPageComponent
  ],
  imports: [
    CommonModule,
    CatalogMembershipsPageRoutingModule
  ]
})
export class CatalogMembershipsPageModule { }
