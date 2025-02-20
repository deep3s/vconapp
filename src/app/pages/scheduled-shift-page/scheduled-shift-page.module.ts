import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduledShiftPageRoutingModule } from './scheduled-shift-page-routing.module';
import { ScheduledShiftPageComponent } from './scheduled-shift-page.component';
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    ScheduledShiftPageComponent
  ],
  imports: [
    CommonModule,
    ScheduledShiftPageRoutingModule,
    FormsModule,
    MatDatepickerModule,
    MatInputModule
  ]
})
export class ScheduledShiftPageModule { }
