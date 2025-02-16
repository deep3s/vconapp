import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessSetupPageRoutingModule } from './business-setup-page-routing.module';
import { BusinessSetupPageComponent } from './business-setup-page.component';

import { BusinessLocationDetailsComponent } from './business-location-details/business-location-details.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { BusinessTypeComponent } from './business-type/business-type.component';

import { BusinessLocationAddressComponent } from './business-location-address/business-location-address.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { LocationTimingsComponent } from './location-timings/location-timings.component';
import { EditLocationComponent } from './edit-location/edit-location.component';
import { EditBillingDetailsComponent } from './edit-billing-details/edit-billing-details.component';


@NgModule({
    declarations: [
        BusinessSetupPageComponent,
        BusinessLocationDetailsComponent,
        BusinessTypeComponent,
        EditLocationComponent,
        EditBillingDetailsComponent,
        LocationTimingsComponent
    ],
  imports: [
    CommonModule,
    BusinessSetupPageRoutingModule,
    ReactiveFormsModule,
    BusinessLocationAddressComponent,
    // LocationTimingsComponent,
    // EditLocationComponent,
    // EditBillingDetailsComponent
    //
    //     CommonModule,
        BusinessSetupPageRoutingModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        FormsModule
    ]
})
export class BusinessSetupPageModule { }
