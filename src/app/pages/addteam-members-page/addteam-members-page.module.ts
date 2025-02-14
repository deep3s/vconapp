import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddteamMembersPageRoutingModule } from './addteam-members-page-routing.module';
import { AddteamMembersPageComponent } from './addteam-members-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";


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
    ]
})
export class AddteamMembersPageModule { }
