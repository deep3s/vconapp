import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessDetailsPageComponent } from './business-details-page.component';

const routes: Routes = [{ path: '', component: BusinessDetailsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessDetailsPageRoutingModule { }
