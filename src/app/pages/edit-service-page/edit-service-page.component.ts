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

  applyPrev() {

  }

  onSubmitPhotoProfile() {

  }
}
