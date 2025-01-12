import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import {AppCommonModule} from "../../core/app-common.module";
//import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#359e00',
  pbThickness: 4,
  pbColor: '#359e00',
  overlayColor: 'rgba(203, 203, 203, 0.6)'
};

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule,
    //NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    LoginPageRoutingModule
  ]
})
export class LoginPageModule { }
