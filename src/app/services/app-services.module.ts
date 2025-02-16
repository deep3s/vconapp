import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {CallElectionService} from "./call-election/call-election.service";
import {CompanyAndIndustryService} from "./company-and-industry/company-and-industry.service";
import {MyEmailAlertsService} from "./my-email-alerts/my-email-alerts.service";
import {OverviewService} from "./overview/overview.service";
import {RegionService} from "./region/region.service";
import {UnelectedService} from './un-elected/unelected.service';
import {ElectionService} from "./election/election.service";
import {VconService} from "./vcon/vcon.service";
import {BusinessSetupService} from "./business-setup/business-setup.service";
import {MapplsService} from "./mappls/mappls.service";

@NgModule({
    declarations: [],
    imports: [HttpClientModule],
    providers: [
        MyEmailAlertsService, CompanyAndIndustryService, ElectionService,
        RegionService, OverviewService, UnelectedService, CallElectionService,
        VconService,
        BusinessSetupService, MapplsService
    ],
})
export class AppServicesModule {
}
