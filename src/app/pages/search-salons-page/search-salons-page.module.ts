import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchSalonsPageRoutingModule } from './search-salons-page-routing.module';
import { SearchSalonsPageComponent } from './search-salons-page.component';
import { SalonDetailsCardComponent } from './salon-details-card/salon-details-card.component';


@NgModule({
  declarations: [
    SearchSalonsPageComponent,
    SalonDetailsCardComponent
  ],
  imports: [
    CommonModule,
    SearchSalonsPageRoutingModule
  ]
})
export class SearchSalonsPageModule { }
