import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddteamMembersPageRoutingModule } from './addteam-members-page-routing.module';
import { AddteamMembersPageComponent } from './addteam-members-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {CatlogPageComponent} from "../catlog-page/catlog-page.component";


@NgModule({
  declarations: [
    AddteamMembersPageComponent
  ],
    imports: [
        CommonModule,
        AddteamMembersPageRoutingModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        FormsModule
    ],
    exports: [AddteamMembersPageComponent]

})
export class AddteamMembersPageModule { }
