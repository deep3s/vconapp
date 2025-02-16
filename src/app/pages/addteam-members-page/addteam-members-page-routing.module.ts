import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddteamMembersPageComponent } from './addteam-members-page.component';

const routes: Routes = [{ path: '', component: AddteamMembersPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddteamMembersPageRoutingModule { }
