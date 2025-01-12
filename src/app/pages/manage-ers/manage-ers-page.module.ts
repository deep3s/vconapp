import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManageERSPageRoutingModule } from "./manage-ers-page-routing.module";
import { ManageErsComponent } from "./manage-ers.component";
import { AppCommonModule } from "../../core/app-common.module";
import { AgGridModule } from "ag-grid-angular";
import { NgxUiLoaderConfig, NgxUiLoaderModule } from "ngx-ui-loader";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from "@ng-select/ng-select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatTooltipModule } from "@angular/material/tooltip";
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  RippleGlobalOptions,
} from "@angular/material/core";
import { DeleteAlertModelComponent } from './delete-alert-model/delete-alert-model.component';
import { EditRecordModelComponent } from './edit-record-model/edit-record-model.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: "#cc212c",
  pbThickness: 4,
  pbColor: "#cc212c",
  overlayColor: "rgba(203, 203, 203, 0.6)",
};
const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 0,
    exitDuration: 0,
  },
};

@NgModule({
  declarations: [ManageErsComponent, DeleteAlertModelComponent, EditRecordModelComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    AppCommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AgGridModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatTooltipModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ManageERSPageRoutingModule,
  ],
  providers: [
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig },
  ],
})
export class ManageERSPageModule {}
