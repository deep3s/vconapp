import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchSalonsPageRoutingModule } from './search-salons-page-routing.module';
import { SearchSalonsPageComponent } from './search-salons-page.component';


@NgModule({
  declarations: [
    SearchSalonsPageComponent
  ],
  imports: [
    CommonModule,
    SearchSalonsPageRoutingModule
  ]
})
export class SearchSalonsPageModule { }
