import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessSetupClientSourcesPageComponent } from './business-setup-client-sources-page.component';

const routes: Routes = [{ path: '', component: BusinessSetupClientSourcesPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessSetupClientSourcesPageRoutingModule { }
