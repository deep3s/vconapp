import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessSetupPageRoutingModule } from './business-setup-page-routing.module';
import { BusinessSetupPageComponent } from './business-setup-page.component';
import { BusinessLocationDetailsComponent } from './business-location-details/business-location-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BusinessTypeComponent } from './business-type/business-type.component';


@NgModule({
  declarations: [
    BusinessSetupPageComponent,
    BusinessLocationDetailsComponent,
    BusinessTypeComponent
  ],
  imports: [
    CommonModule,
    BusinessSetupPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class BusinessSetupPageModule { }
