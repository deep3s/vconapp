import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewServicePageComponent } from './new-service-page.component';

const routes: Routes = [{ path: '', component: NewServicePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewServicePageRoutingModule { }
