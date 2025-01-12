import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ManageErsComponent} from "./manage-ers.component";
import {AuthGuardService} from "../../services/auth-guard/auth-guard.service";

const routes: Routes = [
    {
        path: "",
        component: ManageErsComponent,
    },
    {
        path: "manage-settings",
        canActivate: [AuthGuardService],
        data: {
            title: "Manage Settings",
            status: true,
        },
        loadChildren: () =>
            import("./manage-settings/manage-settings-page.module").then(
                (m) => m.ManageSettingsPageModule
            ),
    },
    {
        path: "edit-ridings",
        canActivate: [AuthGuardService],
        data: {
            title: "Edit Ridings",
            status: true,
        },
        loadChildren: () =>
            import("./manage-ridings/manage-ridings-page.module").then(
                (m) => m.ManageRidingsPageModule
            ),
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManageERSPageRoutingModule {
}
