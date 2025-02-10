import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesAppointmentPageComponent } from './sales-appointment-page.component';

const routes: Routes = [{ path: '', component: SalesAppointmentPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesAppointmentPageRoutingModule { }
