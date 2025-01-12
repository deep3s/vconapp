import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Home",
      status: true,
    },
    loadChildren: () =>
      import("./pages/main-layout/main-layout.module").then(
        (m) => m.MainLayoutModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: "reload",
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
