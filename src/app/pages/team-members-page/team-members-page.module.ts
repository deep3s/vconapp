import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamMembersPageRoutingModule } from './team-members-page-routing.module';
import { TeamMembersPageComponent } from './team-members-page.component';


@NgModule({
  declarations: [
    TeamMembersPageComponent
  ],
  imports: [
    CommonModule,
    TeamMembersPageRoutingModule
  ]
})
export class TeamMembersPageModule { }
