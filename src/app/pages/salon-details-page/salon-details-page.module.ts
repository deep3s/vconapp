import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalonDetailsPageRoutingModule } from './salon-details-page-routing.module';
import { SalonDetailsPageComponent } from './salon-details-page.component';
import {AppSharedModule} from "../../shared-components/app-shared.module";
import { SalonDetailsCardComponent } from './salon-details-card/salon-details-card.component';


@NgModule({
  declarations: [
    SalonDetailsPageComponent,
    SalonDetailsCardComponent
  ],
  imports: [
    CommonModule,
    SalonDetailsPageRoutingModule,
    AppSharedModule
  ]
})
export class SalonDetailsPageModule { }
