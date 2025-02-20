import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesPageRoutingModule } from './sales-page-routing.module';
import { SalesPageComponent } from './sales-page.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SalesPageComponent],
  exports: [SalesPageComponent],
  imports: [
    CommonModule,
    SalesPageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  providers: [MatDatepickerModule, MatNativeDateModule],
})
export class SalesPageModule { }
