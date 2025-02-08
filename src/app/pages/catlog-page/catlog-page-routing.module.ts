import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatlogPageComponent } from './catlog-page.component';

const routes: Routes = [{ path: '', component: CatlogPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatlogPageRoutingModule { }
