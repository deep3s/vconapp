import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerLoginPageRoutingModule } from './customer-login-page-routing.module';
import { CustomerLoginPageComponent } from './customer-login-page.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CustomerLoginPageComponent
  ],
    imports: [
        CommonModule,
        CustomerLoginPageRoutingModule,
        ReactiveFormsModule
    ]
})
export class CustomerLoginPageModule { }
