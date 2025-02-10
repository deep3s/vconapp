import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForBusinessPageRoutingModule } from './for-business-page-routing.module';
import { ForBusinessPageComponent } from './for-business-page.component';
import { SoftwareDetailsComponent } from './software-details/software-details.component';
import { SoftwareReviewsComponent } from './software-reviews/software-reviews.component';
import { SoftwareSolutionsComponent } from './software-solutions/software-solutions.component';
import { OnlineBookingComponent } from './online-booking/online-booking.component';
import { AutomatedMarketingComponent } from './automated-marketing/automated-marketing.component';
import { PartnerReviewComponent } from './partner-review/partner-review.component';
import { BusinessTypeComponent } from './business-type/business-type.component';


@NgModule({
    declarations: [
        ForBusinessPageComponent,
        SoftwareDetailsComponent,
        SoftwareReviewsComponent,
        SoftwareSolutionsComponent,
        OnlineBookingComponent,
        AutomatedMarketingComponent,
        PartnerReviewComponent,
        BusinessTypeComponent
    ],
    exports: [
        BusinessTypeComponent
    ],
    imports: [
        CommonModule,
        ForBusinessPageRoutingModule
    ]
})
export class ForBusinessPageModule { }
