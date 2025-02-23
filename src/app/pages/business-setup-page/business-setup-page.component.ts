import {Component} from '@angular/core';
import {BusinessSetupService} from "../../services/business-setup/business-setup.service";
import {BusinessLocationService} from "../../services/business-location/business-location.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-business-setup-page',
    templateUrl: './business-setup-page.component.html',
    styleUrls: ['./business-setup-page.component.scss']
})
export class BusinessSetupPageComponent {
    step: number = 1; // Default step

    // Object to store form data
    businessLocationDetails: any = {
        locationInfo: null,
        mainBusinessType: null,
        secondaryBusinessTypes: [],
        locationAddress: {},
        locationBillingDetails: {},
        locationTimings: {},
    };

    constructor(private businessSetupService: BusinessSetupService,
                private router: Router,
                private businessLocationService: BusinessLocationService) {
        this.getBusinessSetupFromRouteData();
    }
    getBusinessSetupFromRouteData(): void {
        const navigation = this.router.getCurrentNavigation();
        this.businessLocationDetails = navigation?.extras.state;
    }

    nextStep() {
        if (this.step < 5) {
            this.step++;
        }
    }

    // Previous Step
    prevStep() {
        if (this.step > 1) {
            this.step--;
        }
    }

    // Submit form (final step)
    saveBusinessLocationInfo() {
        this.businessLocationService.saveBusinessLocationDetails(this.businessLocationDetails)
            .pipe().subscribe(data => {
                console.log(data);
        })

    }

    getStepTitle(): string {
        switch (this.step) {
            case 1:
                return "Add a new location";
            case 2:
                return "Choose your main business type";
            case 3:
                return "Choose your secondary business types";
            case 4:
                return "About business location address";
            case 5:
                return "Opening hours";
            default:
                return "";
        }
    }

    getProgress(): number {
        return (this.step / 5) * 100;
    }

    // Function to update location details from child component
    updateLocationInfo(data: any) {
        this.businessLocationDetails.locationInfo = data;
        this.nextStep();
    }

    // Function to update main business type from child component
    updateMainBusinessType(data: any) {
        this.businessLocationDetails.mainBusinessType = data;
    }

    // Function to update secondary business types from child component
    updateSecondaryBusinessTypes(data: any) {
        this.businessLocationDetails.secondaryBusinessTypes = data;
    }

    updateLocationAddress(data: any) {
        this.businessLocationDetails.locationAddress = data;
    }

    updateLocationBillingDetails(data: any) {
        this.businessLocationDetails.locationBillingDetails = data;
    }

    updateLocationTimings(data: any) {
        this.businessLocationDetails.locationTimings = data;
    }

    onSubmitLocationDetails() {
        this.businessSetupService.saveBusinessDetails(this.businessLocationDetails)
            .pipe().subscribe((data: any) => {
            console.log(data);
        }, (err: any) => {
            console.log(err)
        });
    }

}


