import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublisherPageComponent } from './publisher-page.component';

const routes: Routes = [{ path: '', component: PublisherPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublisherPageRoutingModule { }
