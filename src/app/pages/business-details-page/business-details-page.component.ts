import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MANAGE_SETTINGS_CONSTANTS} from "../../shared/manageSetting-constants";
import {BusinessSetupService} from "../../services/business-setup/business-setup.service";

@Component({
  selector: 'app-business-details-page',
  templateUrl: './business-details-page.component.html',
  styleUrls: ['./business-details-page.component.scss']
})
export class BusinessDetailsPageComponent {

  businessDetailsForm: FormGroup;
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
    this.businessDetailsForm = this.formBuilder.group({
      businessName: [],
      note: [],
      facebookLink: [],
      instaLink: [],
      twitterLink: [],
      websiteLink: [],
    });
  }

  // convenience getter for easy access to form fields
  get fmp(): any {
    return this.businessDetailsForm.controls;
  }

  applyPrev(selectedValue: any) : void {
    console.log(selectedValue);
  }

  onSubmitBusinessDetails() {
    let businessDetails = {businessName: this.businessDetailsForm.value.businessName};

    this.businessSetupService.saveBusinessDetails(businessDetails).subscribe((data: any) => {
      console.log(data);
    }, (err: any) => {
      console.log(err)
    });
  }
}
