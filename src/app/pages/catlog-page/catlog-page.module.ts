import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatlogPageRoutingModule } from './catlog-page-routing.module';
import { CatlogPageComponent } from './catlog-page.component';
import { CategoryServicesComponent } from './category-services/category-services.component';
import { CategoryServiceComponent } from './category-service/category-service.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CatlogPageComponent,
    CategoryServicesComponent,
    CategoryServiceComponent
  ],
    imports: [
        CommonModule,
        CatlogPageRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
  exports: [CatlogPageComponent]
})
export class CatlogPageModule { }
