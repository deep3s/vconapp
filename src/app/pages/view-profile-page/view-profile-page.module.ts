import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewProfilePageRoutingModule } from './view-profile-page-routing.module';
import { ViewProfilePageComponent } from './view-profile-page.component';
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
    ViewProfilePageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ViewProfilePageRoutingModule
  ]
})
export class ViewProfilePageModule { }
