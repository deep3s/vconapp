import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessSetupPageRoutingModule } from './business-setup-page-routing.module';
import { BusinessSetupPageComponent } from './business-setup-page.component';
<<<<<<< HEAD
import { BusinessLocationDetailsComponent } from './business-location-details/business-location-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import { BusinessTypeComponent } from './business-type/business-type.component';
=======
import { BusinessLocationAddressComponent } from './business-location-address/business-location-address.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { LocationTimingsComponent } from './location-timings/location-timings.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { EditBillingDetailsComponent } from './edit-billing-details/edit-billing-details.component';
>>>>>>> d5c6600c050a4485744be50afaedb10dcc68fa40


@NgModule({
  declarations: [
    BusinessSetupPageComponent,
<<<<<<< HEAD
    BusinessLocationDetailsComponent,
    BusinessTypeComponent
  ],
  imports: [
    CommonModule,
    BusinessSetupPageRoutingModule,
    ReactiveFormsModule
  ]
=======
    BusinessLocationAddressComponent,
    LocationTimingsComponent,
    EditLocationComponent,
    EditBillingDetailsComponent
  ],
    imports: [
        CommonModule,
        BusinessSetupPageRoutingModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        FormsModule
    ]
>>>>>>> d5c6600c050a4485744be50afaedb10dcc68fa40
})
export class BusinessSetupPageModule { }
