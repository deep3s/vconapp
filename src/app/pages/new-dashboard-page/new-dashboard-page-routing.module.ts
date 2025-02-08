import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewDashboardPageComponent } from './new-dashboard-page.component';

const routes: Routes = [{ path: '', component: NewDashboardPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewDashboardPageRoutingModule { }
