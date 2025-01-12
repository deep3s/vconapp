import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportPageRoutingModule } from './support-page-routing.module';
import { SupportPageComponent } from './support-page.component';
import {AppCommonModule} from "../../core/app-common.module";
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#cc212c',
  pbThickness: 4,
  pbColor: '#cc212c',
  overlayColor: 'rgba(203, 203, 203, 0.6)'
};

@NgModule({
  declarations: [
    SupportPageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    SupportPageRoutingModule
  ]
})
export class SupportPageModule { }
