import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationMenuPageRoutingModule } from './navigation-menu-page-routing.module';
import { NavigationMenuPageComponent } from './navigation-menu-page.component';


@NgModule({
  declarations: [
    NavigationMenuPageComponent
  ],
  imports: [
    CommonModule,
    NavigationMenuPageRoutingModule
  ]
})
export class NavigationMenuPageModule { }
