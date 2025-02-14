import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesAppointmentPageRoutingModule } from './sales-appointment-page-routing.module';
import { SalesAppointmentPageComponent } from './sales-appointment-page.component';


@NgModule({
  declarations: [
    SalesAppointmentPageComponent
  ],
  imports: [
    CommonModule,
    SalesAppointmentPageRoutingModule
  ]
})
export class SalesAppointmentPageModule { }
