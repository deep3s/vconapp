import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgSelectModule } from "@ng-select/ng-select";
import { AgChartsAngularModule } from "ag-charts-angular";
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { NgxUiLoaderConfig, NgxUiLoaderModule } from "ngx-ui-loader";
import { AppCommonModule } from "../../core/app-common.module";
import { CallCancelSubmitModalComponent } from './call-election/call-cancel-submit-modal/call-cancel-submit-modal.component';
import { CallElectionComponent } from "./call-election/call-election.component";
import { CallSubmitModalComponent } from './call-election/call-submit-modal/call-submit-modal.component';
import { ElectionReportingSystemPageRoutingModule } from "./election-reporting-system-page-routing.module";
import { ElectionReportingSystemPageComponent } from "./election-reporting-system-page.component";
import { GroupRidingCallerModelComponent } from './group-riding-caller-model/group-riding-caller-model.component';
import { NoImageComponent } from "./no-image/no-image.component";
import { OverviewComponent } from "./overview/overview.component";
import { ViewRidingsComponent } from "./overview/view-ridings-component/view-ridings-component";
import { PartyCardComponent } from "./party-card/party-card.component";
import { PartyFactsComponent } from "./party-facts/party-facts.component";
import { PublishModalComponent } from "./publish-modal/publish-modal.component";
import { RegionComponent } from "./region/region.component";
import { RidingEyeCardComponent } from './riding-eye-card/riding-eye-card.component';
import { RidingStatusCardComponent } from './riding-status-card/riding-status-card.component';
import { CandidateNamesComponent } from "./ridings/candidate-names/candidate-names.component";
import { MyRidingsModalComponent } from "./ridings/my-ridings-modal/my-ridings-modal.component";
import { RidingsComponent } from "./ridings/ridings.component";
import { Ridings2Component } from './ridings2/ridings2.component';
import { StatusCardComponent } from "./status-card/status-card.component";
import { SubmenuComponent } from "./submenu/submenu.component";
import { TogglePublishComponent } from "./toggle-publish-component/toggle-publish.component";
import { TableLegendModalComponent } from './un-elected/table-legend-modal/table-legend-modal.component';
import { UnElectedComponent } from "./un-elected/un-elected.component";
import { VerticalHeaderRendererComponent } from "./vertical-header-renderer/vertical-header-renderer.component";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: "#cc212c",
  pbThickness: 4,
  pbColor: "#cc212c",
  overlayColor: "rgba(203, 203, 203, 0.6)",
};

@NgModule({
    declarations: [
        ElectionReportingSystemPageComponent,
        TogglePublishComponent,
        PublishModalComponent,
        NoImageComponent,
        RegionComponent,
        UnElectedComponent,
        CallElectionComponent,
        PartyFactsComponent,
        SubmenuComponent,
        PartyCardComponent,
        VerticalHeaderRendererComponent,
        StatusCardComponent,
        OverviewComponent,
        RidingsComponent,
        CandidateNamesComponent,
        MyRidingsModalComponent,
        ViewRidingsComponent,
        CallSubmitModalComponent,
        CallCancelSubmitModalComponent,
        TableLegendModalComponent,
        RidingStatusCardComponent,
        RidingEyeCardComponent,
        GroupRidingCallerModelComponent,
        Ridings2Component,
    ],
    imports: [
        CommonModule,
        DragDropModule,
        AppCommonModule,
        MatSlideToggleModule,
        FormsModule,
        MatTooltipModule,
        MatCheckboxModule,
        MatDialogModule,
        NgSelectModule,
        MatExpansionModule,
        MatProgressBarModule,
        NgxDaterangepickerMd.forRoot({}),
        ReactiveFormsModule,
        AgGridModule,
        AgChartsAngularModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        ElectionReportingSystemPageRoutingModule,
        HttpClientModule
    ],
})
export class ElectionReportingSystemPageModule {}
