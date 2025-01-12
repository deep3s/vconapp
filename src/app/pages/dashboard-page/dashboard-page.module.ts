import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardPageRoutingModule } from './dashboard-page-routing.module';
import { DashboardPageComponent } from './dashboard-page.component';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";
import {AppCommonModule} from "../../core/app-common.module";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#cc212c',
  pbThickness: 4,
  pbColor: '#cc212c',
  overlayColor: 'rgba(203, 203, 203, 0.6)'
};

@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    DashboardPageRoutingModule
  ]
})
export class DashboardPageModule { }
