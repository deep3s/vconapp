import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementPageRoutingModule } from './user-management-page-routing.module';
import { UserManagementPageComponent } from './user-management-page.component';
import {AppCommonModule} from "../../core/app-common.module";
import {AgGridModule} from "ag-grid-angular";
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";
import {UserModalComponent} from "./user-modal/user-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SaveUserConfirmationModalComponent} from "./save-confirmation-modal/save-confirmation-modal.component";
import {MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions} from "@angular/material/core";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#cc212c',
  pbThickness: 4,
  pbColor: '#cc212c',
  overlayColor: 'rgba(203, 203, 203, 0.6)'
};
const globalRippleConfig: RippleGlobalOptions = {
  disabled: true,
  animation: {
    enterDuration: 0,
    exitDuration: 0
  }
};

@NgModule({
  declarations: [
    UserManagementPageComponent,
    SaveUserConfirmationModalComponent,
    UserModalComponent,
  ],
  imports: [
    CommonModule,AppCommonModule,
    AppCommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    AgGridModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    UserManagementPageRoutingModule
  ],
  providers: [
    {provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig}
  ]
})
export class UserManagementPageModule { }
