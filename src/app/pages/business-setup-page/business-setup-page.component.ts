import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-business-setup-page',
  templateUrl: './business-setup-page.component.html',
  styleUrls: ['./business-setup-page.component.scss']
})
export class BusinessSetupPageComponent {
  step: number = 1; // Default step

  // Object to store form data
  formData: any = {
    locationDetails: null,
    mainBusinessType: null,
    secondaryBusinessTypes: []
  };

  // Next Step: Store data before moving forward
  nextStep() {
    console.log("Moving to next step:", this.step);
    console.log("Stored Data:", this.formData); // Check if data is updated

    if (this.step < 3) {
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
    this.formData.locationDetails = data;
    console.log("Updated Location Data:", this.formData.locationDetails);
  }

  // Function to update main business type from child component
  updateMainBusinessType(data: any) {
    this.formData.mainBusinessType = data;
    console.log("Updated Main Business Type:", this.formData.mainBusinessType);
  }

  // Function to update secondary business types from child component
  updateSecondaryBusinessTypes(data: any) {
    this.formData.secondaryBusinessTypes = data;
    console.log("Updated Secondary Business Types:", this.formData.secondaryBusinessTypes);
  }

  // Submit form (final step)
  submitForm() {
    console.log("Final Form Data:", this.formData);
    alert("Form Submitted Successfully!");
  }

  getStepTitle(): string {
    switch (this.step) {
      case 1: return "Add a new location";
      case 2: return "Choose your main business type";
      case 3: return "Choose your secondary business types";
      default: return "";
    }
  }

  getProgress(): number {
    return (this.step - 1) * 50; // Progress bar updates dynamically
  }
}


