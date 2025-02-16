import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamMembersPageComponent } from './team-members-page.component';

const routes: Routes = [{ path: '', component: TeamMembersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamMembersPageRoutingModule { }
