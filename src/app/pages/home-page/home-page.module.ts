import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageRoutingModule } from './home-page-routing.module';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { HomePageComponent } from './home-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import { MatNativeDateModule } from '@angular/material/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

// import {MatAutocompleteModule} from "@angular/material/autocomplete";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#359e00',
  pbThickness: 4,
  pbColor: '#359e00',
  overlayColor: 'rgba(203, 203, 203, 0.6)'
};

@NgModule({
  declarations: [

  
    HomePageComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatChipsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        HomePageRoutingModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatListModule,
        MatSelectModule,
        MatNativeDateModule,
        MatButtonModule,
        MatCardModule,


    ]
})

export class HomePageModule { }
