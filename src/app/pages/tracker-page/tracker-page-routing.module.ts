import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrackerPageComponent } from './tracker-page.component';

const routes: Routes = [{ path: '', component: TrackerPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrackerPageRoutingModule { }
