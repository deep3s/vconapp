import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalLoginPageRoutingModule } from './professional-login-page-routing.module';
import { ProfessionalLoginPageComponent } from './professional-login-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProfessionalLoginPageComponent
  ],
    imports: [
        CommonModule,
        ProfessionalLoginPageRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class ProfessionalLoginPageModule { }
