import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduledShiftPageComponent } from './scheduled-shift-page.component';

const routes: Routes = [{ path: '', component: ScheduledShiftPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduledShiftPageRoutingModule { }
