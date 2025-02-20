import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleLoginPageComponent } from './google-login-page.component';

const routes: Routes = [{ path: '', component: GoogleLoginPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleLoginPageRoutingModule { }
