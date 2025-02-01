import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchSalonsPageComponent } from './search-salons-page.component';

const routes: Routes = [{ path: '', component: SearchSalonsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchSalonsPageRoutingModule { }
