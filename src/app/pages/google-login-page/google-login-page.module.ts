import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoogleLoginPageRoutingModule } from './google-login-page-routing.module';
import { GoogleLoginPageComponent } from './google-login-page.component';


@NgModule({
  declarations: [
    GoogleLoginPageComponent
  ],
  imports: [
    CommonModule,
    GoogleLoginPageRoutingModule
  ]
})
export class GoogleLoginPageModule { }
