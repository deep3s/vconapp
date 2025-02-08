import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessDetailsPageRoutingModule } from './business-details-page-routing.module';
import { BusinessDetailsPageComponent } from './business-details-page.component';
import {AppCommonModule} from "../../core/app-common.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";


@NgModule({
  declarations: [
    BusinessDetailsPageComponent
  ],
    imports: [
        CommonModule,
        BusinessDetailsPageRoutingModule,
        AppCommonModule,
        FormsModule,
        MatRadioModule,
        AppCommonModule,
        ReactiveFormsModule
    ]
})
export class BusinessDetailsPageModule { }
