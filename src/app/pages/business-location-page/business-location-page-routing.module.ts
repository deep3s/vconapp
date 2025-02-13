import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessLocationPageComponent } from './business-location-page.component';

const routes: Routes = [{ path: '', component: BusinessLocationPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessLocationPageRoutingModule { }
