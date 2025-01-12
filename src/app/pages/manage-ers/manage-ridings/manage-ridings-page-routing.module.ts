import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ManageRidingsComponent } from "./manage-ridings.component";

const routes: Routes = [{ path: "", component: ManageRidingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageRidingsPageRoutingModule {}
