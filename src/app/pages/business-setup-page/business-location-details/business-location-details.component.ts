import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MANAGE_SETTINGS_CONSTANTS} from "../../../shared/manageSetting-constants";
import {BusinessSetupService} from "../../../services/business-setup/business-setup.service";

@Component({
  selector: 'business-location-details',
  templateUrl: './business-location-details.component.html',
  styleUrls: ['./business-location-details.component.scss']
})
export class BusinessLocationDetailsComponent {

  businessLocationForm: FormGroup;
  submitted = false;

  warning_1: any = MANAGE_SETTINGS_CONSTANTS.Warning_1
  warning_2: any = MANAGE_SETTINGS_CONSTANTS.Warning_2

  selectedWarning1: any = {};
  selectedWarning2: any = {};

  constructor(private formBuilder: FormBuilder,
              private businessSetupService: BusinessSetupService) {
    // console.log(data);
  }

  ngOnInit(): void {
    this.businessLocationForm = this.formBuilder.group({
      locName: [],
      locContactLink: [],
      locEmailLink: [],
    });
  }

  // convenience getter for easy access to form fields
  get fmp(): any {
    return this.businessLocationForm.controls;
  }


  onSubmitBusinessLocation() {
    console.log(this.businessLocationForm.value);
    /* let businessDetails = {businessName: this.businessDetailsForm.value.businessName};

     this.businessSetupService.saveBusinessDetails(businessDetails).subscribe((data: any) => {
       console.log(data);
     }, (err: any) => {
       console.log(err)
     });*/
   }

}
