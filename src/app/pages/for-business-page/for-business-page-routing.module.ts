import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForBusinessPageComponent } from './for-business-page.component';

const routes: Routes = [{ path: '', component: ForBusinessPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForBusinessPageRoutingModule { }
