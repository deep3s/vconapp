import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BusinessSetupService} from "../../../services/business-setup/business-setup.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: []
})
export class EditLocationComponent {
  directions = "";

  editLocationForm: FormGroup;
  submitted = false;
  private location: any;


  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditLocationComponent>,
              @Inject(MAT_DIALOG_DATA) public locationInfo: any) {
  }

  ngOnInit(): void {
    this.editLocationForm = this.formBuilder.group({
      address: this.locationInfo?.address,
      apt: '',
      district: this.locationInfo?.district,
      city: this.locationInfo?.city,
      subDivision: this.locationInfo?.subDivision,
      state: this.locationInfo?.state,
      postCode:this.locationInfo?.postCode,
      country: this.locationInfo?.country,
      directions: ''
    });
  }

// convenience getter for easy access to form fields
  get fmp(): any {
    return this.editLocationForm.controls;
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveLocationDetails(): void {
    this.dialogRef.close({ locationDetails: this.editLocationForm.value });
  }

}
