import { NgModule } from '@angular/core';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import {HeaderModule} from '../../core/header/header.module';
import {AppCommonModule} from '../../core/app-common.module';
import {AppServicesModule} from '../../services/app-services.module';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";
import {CommonModule} from "@angular/common";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#cc212c',
  pbThickness: 4,
  pbColor: '#cc212c',
  overlayColor: 'rgba(203, 203, 203, 0.6)'
};

@NgModule({
  declarations: [
    MainLayoutComponent,
  ],
  imports: [
    MainLayoutRoutingModule,
    HeaderModule,
    AppCommonModule,
    CommonModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    AppServicesModule,
  ],
  providers: [],
  bootstrap: [MainLayoutComponent]
})
export class MainLayoutModule { }
