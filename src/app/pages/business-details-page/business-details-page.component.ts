import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MANAGE_SETTINGS_CONSTANTS} from "../../shared/manageSetting-constants";

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

  constructor(private formBuilder: FormBuilder) {
    // console.log(data);
  }

  ngOnInit(): void {
    this.businessDetailsForm = this.formBuilder.group({
      businessName: [{value: 'V cut',}],
      fileName: [{value: '', disabled: true}],
      description: [{value: '',}],
      note: [{value: '',}],
      facebookLink: [{value: '',}],
      instaLink: [{value: '',}],
      twitterLink: [{value: '',}],
      websiteLink: [{value: '',}],
      subject: [{value: '', disabled: true}],
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

  }
}
