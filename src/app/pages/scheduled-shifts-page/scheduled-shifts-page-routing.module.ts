import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledShiftsPageComponent } from './scheduled-shifts-page.component';

const routes: Routes = [{ path: '', component: ScheduledShiftsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledShiftsPageRoutingModule { }
