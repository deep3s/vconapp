import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginPageComponent } from './customer-login-page.component';

const routes: Routes = [{ path: '', component: CustomerLoginPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerLoginPageRoutingModule { }
