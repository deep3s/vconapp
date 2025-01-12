import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ElectionReportingSystemPageComponent } from "./election-reporting-system-page.component";
import { AuthGuardService } from "../../services/auth-guard/auth-guard.service";
import { OverviewComponent } from "./overview/overview.component";
import { RidingsComponent } from "./ridings/ridings.component";
import { RegionComponent } from "./region/region.component";
import { UnElectedComponent } from "./un-elected/un-elected.component";
import { CallElectionComponent } from "./call-election/call-election.component";
import { PartyFactsComponent } from "./party-facts/party-facts.component";
import { LanguageComponent } from "./language/language.component";
import { Ridings2Component } from "./ridings2/ridings2.component";

const routes: Routes = [
  {
    path: "",
    component: ElectionReportingSystemPageComponent,
    children: [
      {
        path: "overview",
        data: {
          title: "Election Reporting System (ERS)",
          status: true,
        },
        canActivate: [AuthGuardService],
        component: OverviewComponent,
      },
      {
        path: "ridings",
        data: {
          title: "Election Reporting System (ERS)",
          status: true,
        },
        canActivate: [AuthGuardService],
        component: RidingsComponent,
      },
      {
        path: "ridings-2",
        data: {
          title: "Election Reporting System (ERS)",
          status: true,
        },
        canActivate: [AuthGuardService],
        component: Ridings2Component,
      },
      {
        path: "region",
        data: {
          title: "Election Reporting System (ERS)",
          status: true,
        },
        canActivate: [AuthGuardService],
        component: RegionComponent,
      },
      {
        path: "unElected",
        data: {
          title: "Election Reporting System (ERS)",
          status: true,
        },
        canActivate: [AuthGuardService],
        component: UnElectedComponent,
      },
      {
        path: "callElection",
        data: {
          title: "Election Reporting System (ERS)",
          status: true,
        },
        canActivate: [AuthGuardService],
        component: CallElectionComponent,
      },
      {
        path: "partyFacts",
        data: {
          title: "Election Reporting System (ERS)",
          status: true,
        },
        canActivate: [AuthGuardService],
        component: PartyFactsComponent,
      },
      {
        path: "language",
        data: {
          title: "Election Reporting System (ERS)",
          status: true,
        },
        canActivate: [AuthGuardService],
        component: LanguageComponent,
      },
      { path: "", redirectTo: "overview", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElectionReportingSystemPageRoutingModule {}
