import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewServicePageRoutingModule } from './new-service-page-routing.module';
import { NewServicePageComponent } from './new-service-page.component';
import {AppCommonModule} from "../../core/app-common.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    NewServicePageComponent
  ],
    imports: [
        CommonModule,
        NewServicePageRoutingModule,
        AppCommonModule,
        ReactiveFormsModule
    ]
})
export class NewServicePageModule { }
