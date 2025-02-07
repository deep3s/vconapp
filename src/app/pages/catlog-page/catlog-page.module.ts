import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatlogPageRoutingModule } from './catlog-page-routing.module';
import { CatlogPageComponent } from './catlog-page.component';


@NgModule({
  declarations: [
    CatlogPageComponent
  ],
  imports: [
    CommonModule,
    CatlogPageRoutingModule
  ]
})
export class CatlogPageModule { }
