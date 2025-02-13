import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessLocationPageRoutingModule } from './business-location-page-routing.module';
import { BusinessLocationPageComponent } from './business-location-page.component';


@NgModule({
  declarations: [
    BusinessLocationPageComponent
  ],
  imports: [
    CommonModule,
    BusinessLocationPageRoutingModule
  ]
})
export class BusinessLocationPageModule { }
