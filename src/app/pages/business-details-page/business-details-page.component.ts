import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MANAGE_SETTINGS_CONSTANTS} from "../../shared/manageSetting-constants";
import {BusinessSetupService} from "../../services/business-setup/business-setup.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-business-details-page',
    templateUrl: './business-details-page.component.html',
    styleUrls: ['./business-details-page.component.scss']
})
export class BusinessDetailsPageComponent {

    businessDetailsForm: FormGroup;
    submitted = false;
    businessDetails: any = null;

    warning_1: any = MANAGE_SETTINGS_CONSTANTS.Warning_1
    warning_2: any = MANAGE_SETTINGS_CONSTANTS.Warning_2

    selectedWarning1: any = {};
    selectedWarning2: any = {};

    constructor(private formBuilder: FormBuilder,
                private router: Router,
                private businessSetupService: BusinessSetupService) {
        this.getBusinessDetailsFromRouteData();
    }

    getBusinessDetailsFromRouteData(): void {
        const navigation = this.router.getCurrentNavigation();
        this.businessDetails = navigation?.extras.state;
    }

    ngOnInit(): void {
        this.businessDetailsForm = this.formBuilder.group({
            businessName: [],
            businessOwner: [],
            businessEmail: [],
            businessPhone: [],
            note: [],
            facebookLink: [],
            instaLink: [],
            twitterLink: [],
            websiteLink: [],
        });
        if (this.businessDetails) {
            this.businessDetailsForm.patchValue(this.businessDetails);
        }
    }

    // convenience getter for easy access to form fields
    get fmp(): any {
        return this.businessDetailsForm.controls;
    }

    applyPrev(selectedValue: any): void {
        console.log(selectedValue);
    }

    onSubmitBusinessDetails() {
        let businessDetails = {...this.businessDetailsForm.value};

        if (this.businessDetails?.id) {
            this.businessSetupService.updateBusinessDetails(
                {...this.businessDetails, ...businessDetails}).pipe().subscribe(
                () => {
                    this.goToBusinessDetails();
                }, (err: any) => {
                    console.log(err)
                });
        } else {
            this.businessSetupService.createBusinessDetails(businessDetails).pipe().subscribe(
                () => {
                    this.goToBusinessDetails();
                }, (err: any) => {
                    console.log(err)
                });
        }
    }

    goToBusinessDetails(): void {
        this.router.navigateByUrl('/business-details');
    }
}
