import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogProductsPageComponent } from './catalog-products-page.component';

const routes: Routes = [{ path: '', component: CatalogProductsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogProductsPageRoutingModule { }
