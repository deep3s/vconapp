import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ManageSettingsComponent} from "./manage-settings.component";

const routes: Routes = [
    {path: "", component: ManageSettingsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageSettingsPageRoutingModule {
}
