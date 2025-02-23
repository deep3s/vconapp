import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'edit-billing-details',
  templateUrl: './edit-billing-details.component.html',
  styleUrls: ['./edit-billing-details.component.scss']
})
export class EditBillingDetailsComponent {

  invoiceNote = "";

  editBillingForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<EditBillingDetailsComponent>,
              @Inject(MAT_DIALOG_DATA) public businessBillingDetails: any) {
    // console.log(data);
  }

  ngOnInit(): void {
    this.editBillingForm = this.formBuilder.group({
      businessLocName: this.businessBillingDetails.businessLocName,
      address: this.businessBillingDetails?.address,
      apt: this.businessBillingDetails?.apt,
      city: this.businessBillingDetails?.city,
      state: this.businessBillingDetails?.state,
      postCode:this.businessBillingDetails?.postCode,
      invoiceNote: '',
      useLocationForBilling: true
    });
  }

  // convenience getter for easy access to form fields
  get fmp(): any {
    return this.editBillingForm.controls;
  }

  closeModal() {
    this.dialogRef.close();
  }

  saveBillingDetails(): void {
    this.dialogRef.close({ businessBillingDetails: this.editBillingForm.value });
  }
}