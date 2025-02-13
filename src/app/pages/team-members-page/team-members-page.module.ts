import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMembersPageRoutingModule } from './team-members-page-routing.module';
import { TeamMembersPageComponent } from './team-members-page.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TeamMembersPageComponent
  ],
  imports: [
    CommonModule,
    TeamMembersPageRoutingModule,
    FormsModule
  ]
})
export class TeamMembersPageModule { }
