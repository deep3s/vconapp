import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
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
import {MatRadioModule} from '@angular/material/radio';
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {RatingStarComponent} from './rating-star/rating-star.component';
import {StarsComponent} from './stars/stars.component';
import {ServiceListComponent} from './service-list/service-list.component';
import {ServiceBookingComponent} from './service-booking/service-booking.component';
import {SalonCardComponent} from "./salon-card/salon-card.component";
import {SalonCardsComponent} from "./salon-cards/salon-cards.component";

@NgModule({
    declarations: [
        RatingStarComponent,
        StarsComponent,
        ServiceListComponent,
        ServiceBookingComponent,
        SalonCardComponent,
        SalonCardsComponent,
        SalonCardsComponent,
        ServiceBookingComponent
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
        RatingStarComponent,
        StarsComponent,
        ServiceListComponent,
        ServiceBookingComponent,
        SalonCardComponent,
        SalonCardsComponent
    ],
    bootstrap: []


})
export class AppSharedModule {
}
