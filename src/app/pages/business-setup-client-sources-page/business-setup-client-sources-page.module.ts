import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessSetupClientSourcesPageRoutingModule } from './business-setup-client-sources-page-routing.module';
import { BusinessSetupClientSourcesPageComponent } from './business-setup-client-sources-page.component';


@NgModule({
  declarations: [
    BusinessSetupClientSourcesPageComponent
  ],
  imports: [
    CommonModule,
    BusinessSetupClientSourcesPageRoutingModule
  ]
})
export class BusinessSetupClientSourcesPageModule { }
