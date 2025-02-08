import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditServicePageComponent } from './edit-service-page.component';

const routes: Routes = [{ path: '', component: EditServicePageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditServicePageRoutingModule { }
