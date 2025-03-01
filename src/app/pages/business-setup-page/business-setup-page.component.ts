import {Component, OnInit} from '@angular/core';
import {BusinessSetupService} from "../../services/business-setup/business-setup.service";
import {BusinessLocationService} from "../../services/business-location/business-location.service";
import {Router} from "@angular/router";
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-business-setup-page',
    templateUrl: './business-setup-page.component.html',
    styleUrls: ['./business-setup-page.component.scss']
})

export class BusinessSetupPageComponent implements OnInit {
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

    selectedLocation: any = this.businessLocationDetails;
    locationInfoId: any;
    businessTypeId: any;


    constructor(private businessSetupService: BusinessSetupService,
                private router: Router,
                private route: ActivatedRoute,
                private businessLocationService: BusinessLocationService) {
        this.getBusinessLocationIdFromRouteParams();
    }

    ngOnInit() {

    }


    fetchLocationInfo(): void {
        this.businessLocationService.getBusinessLocationById(this.locationInfoId).pipe().subscribe(
            (locationDetails: any[]) => {
                this.businessLocationDetails = locationDetails;
                this.selectedLocation = locationDetails;
            },
            error => {
                console.error("Error fetching business locations:", error);
            }
        );
    }

    getBusinessLocationIdFromRouteParams(): void {
        this.route.queryParams.subscribe(params => {
            this.locationInfoId = params['id']; // Get the 'id' from URL
            this.businessTypeId = params['businessTypeId']; // Get 'businessTypeId' from URL
            if(this.locationInfoId){
                this.fetchLocationInfo();
            }
        });
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

        if(this.businessLocationDetails.id) {
            this.businessLocationService.updateBusinessLocationDetails(this.businessLocationDetails)
                .pipe().subscribe(data => {
                console.log(data);
            })
        } else{
            this.businessLocationService.createBusinessLocationDetails(this.businessLocationDetails)
                .pipe().subscribe(data => {
                console.log(data);
            })
        }
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
}
