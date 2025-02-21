import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomePageRoutingModule} from './home-page-routing.module';
import {NgxUiLoaderConfig, NgxUiLoaderModule} from "ngx-ui-loader";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {HomePageComponent} from './home-page.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {RatingStarComponent} from 'src/app/shared-components/rating-star/rating-star.component';
import {AppSharedModule} from 'src/app/shared-components/app-shared.module';
import {SalonCardsComponent} from "../../shared-components/salon-cards/salon-cards.component";
import {DownloadAppComponent} from './download-app/download-app.component';
import { ReviewCardsComponent } from './review-cards/review-cards.component';
import { TopRatedComponent } from './top-rated/top-rated.component';
import { BrowseCityComponent } from './browse-city/browse-city.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

// import {MatAutocompleteModule} from "@angular/material/autocomplete";

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    fgsColor: '#359e00',
    pbThickness: 4,
    pbColor: '#359e00',
    overlayColor: 'rgba(203, 203, 203, 0.6)'
};

@NgModule({
    declarations: [

        HomePageComponent,
        DownloadAppComponent,
        ReviewCardsComponent,
        TopRatedComponent,
        BrowseCityComponent,
        SearchBarComponent,
    ],
    imports: [
        CommonModule,
        AppSharedModule,
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

export class HomePageModule {
}
