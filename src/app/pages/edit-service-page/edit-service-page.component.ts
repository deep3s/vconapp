import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {
  SavePublishConfirmationModalComponent
} from "../publisher-page/save-confirmation-modal/save-confirmation-modal.component";
import {MANAGE_SETTINGS_CONSTANTS} from "../../shared/manageSetting-constants";
@Component({
  selector: 'edit-service-page',
  templateUrl: './edit-service-page.component.html',
  styleUrls: ['./edit-service-page.component.scss']
})
export class EditServicePageComponent implements OnInit {
  userForm: FormGroup;
  submitted = false;

  warning_1: any = MANAGE_SETTINGS_CONSTANTS.Warning_1
  warning_2: any = MANAGE_SETTINGS_CONSTANTS.Warning_2

  selectedWarning1: any = {};
  selectedWarning2: any = {};

  constructor(private formBuilder: FormBuilder) {
    // console.log(data);
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      title: [{value: '',}],
      fileName: [{value: '', disabled: true}],
      description: [{value: '',}],
      assetDate: [{value: '',}],
      subject: [{value: '', disabled: true}],
    });
  }

  // convenience getter for easy access to form fields
  get fmp(): any {
    return this.userForm.controls;
  }

  applyPrev(selectedValue: any) : void {
    console.log(selectedValue);
  }

  onSubmitPhotoProfile() {

  }

  details: any = [
    {name: 'Basic details', active: true},
    {name: 'Team members'},
    {name: 'Resources'}
  ];

  settings: any = [
    {name: 'Online booking'},
    {name: 'Forms',},
    {name: 'Commissions'},
    {name: 'Settings'}
  ];

  selectedDetails: any = this.details[0];

  selectDetails(selected: any) {
    this.details.forEach(item => item.active = false);
    this.settings.forEach(item => item.active = false);

    selected.active = true;
    this.selectedDetails = selected;
  }
}