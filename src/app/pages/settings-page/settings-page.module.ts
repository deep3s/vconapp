import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsPageRoutingModule } from './settings-page-routing.module';
import { SettingsPageComponent } from './settings-page.component';
import { WorkspaceSettingsComponent } from './workspace-settings/workspace-settings.component';


@NgModule({
  declarations: [
    SettingsPageComponent,
    WorkspaceSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsPageRoutingModule
  ]
})
export class SettingsPageModule { }
