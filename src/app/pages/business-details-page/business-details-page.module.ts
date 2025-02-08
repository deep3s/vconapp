import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessDetailsPageRoutingModule } from './business-details-page-routing.module';
import { BusinessDetailsPageComponent } from './business-details-page.component';
import {AppCommonModule} from "../../core/app-common.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BusinessDetailsPageComponent
  ],
    imports: [
        CommonModule,
        BusinessDetailsPageRoutingModule,
        AppCommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class BusinessDetailsPageModule { }
