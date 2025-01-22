import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalonDetailsPageRoutingModule } from './salon-details-page-routing.module';
import { SalonDetailsPageComponent } from './salon-details-page.component';


@NgModule({
  declarations: [
    SalonDetailsPageComponent
  ],
  imports: [
    CommonModule,
    SalonDetailsPageRoutingModule
  ]
})
export class SalonDetailsPageModule { }
