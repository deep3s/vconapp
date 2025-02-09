import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessSetupPageRoutingModule } from './business-setup-page-routing.module';
import { BusinessSetupPageComponent } from './business-setup-page.component';
import { BusinessSetupComponent } from './business-setup/business-setup.component';


@NgModule({
  declarations: [
    BusinessSetupPageComponent,
    BusinessSetupComponent
  ],
  imports: [
    CommonModule,
    BusinessSetupPageRoutingModule
  ]
})
export class BusinessSetupPageModule { }
