import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduledShiftsPageRoutingModule } from './scheduled-shifts-page-routing.module';
import { ScheduledShiftsPageComponent } from './scheduled-shifts-page.component';
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [
    ScheduledShiftsPageComponent
  ],
    imports: [
        CommonModule,
        ScheduledShiftsPageRoutingModule,
        FormsModule,
        MatDatepickerModule,
        MatInputModule
    ]
})
export class ScheduledShiftsPageModule { }
