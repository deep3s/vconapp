import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessLocationPageRoutingModule } from './business-location-page-routing.module';
import { BusinessLocationPageComponent } from './business-location-page.component';
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    BusinessLocationPageComponent
  ],
    imports: [
        CommonModule,
        BusinessLocationPageRoutingModule,
        NgbDropdownItem,
        NgbDropdownMenu,
        NgbDropdownToggle,
        NgbDropdown
    ]
})
export class BusinessLocationPageModule { }
