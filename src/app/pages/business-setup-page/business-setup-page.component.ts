import {Component} from '@angular/core';
import {BusinessSetupService} from "../../services/business-setup/business-setup.service";

@Component({
    selector: 'app-business-setup-page',
    templateUrl: './business-setup-page.component.html',
    styleUrls: ['./business-setup-page.component.scss']
})
export class BusinessSetupPageComponent {
    step: number = 4; // Default step
    locationSearchResults: any = [];

    // Object to store form data
    businessLocationDetails: any = {
        locationDetails: null,
        mainBusinessType: null,
        secondaryBusinessTypes: []
    };

    constructor(private businessSetupService: BusinessSetupService) {
    }

    // Next Step: Store data before moving forward
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

    // Function to update location details from child component
    updateLocationData(data: any) {
        this.businessLocationDetails.locationDetails = data;
        this.nextStep();

        console.log("Updated Location Data:", this.businessLocationDetails.locationDetails);
    }

    // Function to update main business type from child component
    updateMainBusinessType(data: any) {
        this.businessLocationDetails.mainBusinessType = data;
        console.log("Updated Main Business Type:", this.businessLocationDetails.mainBusinessType);
    }

    // Function to update secondary business types from child component
    updateSecondaryBusinessTypes(data: any) {
        this.businessLocationDetails.secondaryBusinessTypes = data;
        console.log("Updated Secondary Business Types:", this.businessLocationDetails.secondaryBusinessTypes);
    }

    // Submit form (final step)
    submitForm() {
        console.log("Final Form Data:", this.businessLocationDetails);
        alert("Form Submitted Successfully!");
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

    onSubmitLocationDetails() {
        this.businessSetupService.saveBusinessDetails(this.businessLocationDetails)
            .pipe().subscribe((data: any) => {
            console.log(data);
        }, (err: any) => {
            console.log(err)
        });
    }


}


