import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import {LicenseManager} from 'ag-grid-enterprise';

const licenseKey = 'Using_this_AG_Grid_Enterprise_key_( AG-041176 )_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_( legal@ag-grid.com )___For_help_with_changing_this_key_please_contact_( info@ag-grid.com )___( THE V-CUT SALON & SPA )_is_granted_a_( Multiple Applications )_Developer_License_for_( 1 ))_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_need_to_be_licensed_in_addition_to_the_ones_working_with_AG_Grid_Enterprise___This_key_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_AG_Grid_Enterprise_versions_released_before_( 18 May 2024 )____[v2]_MTcxNTk4NjgwMDAwMA==b99f221b211111cbc00f3844a9a226f1'

LicenseManager.setLicenseKey
(licenseKey);


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
