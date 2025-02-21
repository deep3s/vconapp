import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationMenuPageComponent } from './navigation-menu-page.component';

const routes: Routes = [{ path: '', component: NavigationMenuPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationMenuPageRoutingModule { }
