import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesBookingsPageRoutingModule } from './services-bookings-page-routing.module';
import { ServicesBookingsPageComponent } from './services-bookings-page.component';
import { FormsModule } from '@angular/forms';
import {AppSharedModule} from "../../shared-components/app-shared.module";

@NgModule({
  declarations: [ServicesBookingsPageComponent],
    imports: [CommonModule, ServicesBookingsPageRoutingModule, FormsModule, AppSharedModule],
})
export class ServicesBookingsPageModule {}
