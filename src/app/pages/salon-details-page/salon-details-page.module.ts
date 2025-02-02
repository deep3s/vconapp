import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalonDetailsPageRoutingModule } from './salon-details-page-routing.module';
import { SalonDetailsPageComponent } from './salon-details-page.component';
import {AppSharedModule} from "../../shared-components/app-shared.module";


@NgModule({
  declarations: [
    SalonDetailsPageComponent
  ],
  imports: [
    CommonModule,
    SalonDetailsPageRoutingModule,
    AppSharedModule
  ]
})
export class SalonDetailsPageModule { }
