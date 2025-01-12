import {NgModule} from '@angular/core';
import {AppTableComponent} from './app-table/app-table.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import {NotificationsComponent} from './notifications/notifications.component';
import {ClickOutsideModule} from 'ng-click-outside';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {AppFooterComponent} from './app-footer/app-footer.component';
import {NoDataAvailableComponent} from './no-data-available/no-data-available.component';
import {MatRadioModule} from '@angular/material/radio';
import {PinnedMenuComponent} from './pinned-menu/pinned-menu.component';
import {AppSubmenuComponent} from './app-submenu/app-submenu.component';
import {MatMomentDateModule} from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    AppTableComponent,
    BreadcrumbsComponent,
    NotificationsComponent,
    AppFooterComponent,
    NoDataAvailableComponent,
    PinnedMenuComponent,
    AppSubmenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ClickOutsideModule,
    MatTabsModule,
    MatCheckboxModule,
    MatExpansionModule,
    FormsModule,
    MatDialogModule,
    ClipboardModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMomentDateModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
  ],
  providers: [],
  exports: [
    AppFooterComponent,
    AppTableComponent,
    BreadcrumbsComponent,
    NotificationsComponent,
    NoDataAvailableComponent,
    PinnedMenuComponent,
    AppSubmenuComponent,
  ],
  bootstrap: []
})
export class AppCommonModule {
}
