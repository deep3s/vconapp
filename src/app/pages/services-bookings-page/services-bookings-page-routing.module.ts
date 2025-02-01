import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesBookingsPageComponent } from './services-bookings-page.component';

const routes: Routes = [{ path: '', component: ServicesBookingsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesBookingsPageRoutingModule {}
