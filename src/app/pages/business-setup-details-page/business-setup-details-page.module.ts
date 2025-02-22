import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessSetupDetailsPageRoutingModule } from './business-setup-details-page-routing.module';
import { BusinessSetupDetailsPageComponent } from './business-setup-details-page.component';


@NgModule({
  declarations: [
    BusinessSetupDetailsPageComponent
  ],
  imports: [
    CommonModule,
    BusinessSetupDetailsPageRoutingModule
  ]
})
export class BusinessSetupDetailsPageModule { }
