import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessSetupDetailsPageComponent } from './business-setup-details-page.component';

const routes: Routes = [{ path: '', component: BusinessSetupDetailsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessSetupDetailsPageRoutingModule { }
