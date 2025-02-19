import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogMembershipsPageComponent } from './catalog-memberships-page.component';

const routes: Routes = [{ path: '', component: CatalogMembershipsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogMembershipsPageRoutingModule { }
