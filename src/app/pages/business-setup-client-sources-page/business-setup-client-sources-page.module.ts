import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessSetupClientSourcesPageRoutingModule } from './business-setup-client-sources-page-routing.module';
import { BusinessSetupClientSourcesPageComponent } from './business-setup-client-sources-page.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    BusinessSetupClientSourcesPageComponent
  ],
  imports: [
    CommonModule,
    BusinessSetupClientSourcesPageRoutingModule,
    FormsModule
  ]
})
export class BusinessSetupClientSourcesPageModule { }
