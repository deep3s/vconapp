import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfessionalLoginPageComponent } from './professional-login-page.component';

const routes: Routes = [{ path: '', component: ProfessionalLoginPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalLoginPageRoutingModule { }
