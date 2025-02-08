import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditServicePageRoutingModule } from './edit-service-page-routing.module';
import { EditServicePageComponent } from './edit-service-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {AppCommonModule} from "../../core/app-common.module";



@NgModule({
  declarations: [
    EditServicePageComponent
  ],
    imports: [
        CommonModule,
        AppCommonModule,
        EditServicePageRoutingModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
    ]
})
export class EditServicePageModule { }
