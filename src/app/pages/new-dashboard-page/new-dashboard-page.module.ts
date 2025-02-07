import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewDashboardPageRoutingModule } from './new-dashboard-page-routing.module';
import { NewDashboardPageComponent } from './new-dashboard-page.component';


@NgModule({
  declarations: [
    NewDashboardPageComponent
  ],
  imports: [
    CommonModule,
    NewDashboardPageRoutingModule
  ]
})
export class NewDashboardPageModule { }
