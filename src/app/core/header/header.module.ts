import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderComponent} from './app-header.component';
import {LayoutModule} from '@angular/cdk/layout';
import {RouterModule} from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

import {ClickOutsideModule} from 'ng-click-outside';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AppCommonModule} from '../app-common.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {LogoutModalComponent} from "./logout-modal/logout-modal.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCheckboxModule,
    FormsModule,
    ClickOutsideModule,
    MatTooltipModule,
    MatExpansionModule,
      MatButtonToggleModule,
    MatDialogModule,
    AppCommonModule,
  ],
  declarations: [
    AppHeaderComponent,
    LogoutModalComponent
  ],
  exports: [
    AppHeaderComponent,
  ]
})
export class HeaderModule {
}
