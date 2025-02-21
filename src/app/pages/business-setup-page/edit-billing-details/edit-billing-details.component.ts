import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BusinessSetupService} from "../../../services/business-setup/business-setup.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

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
              private editBilling: BusinessSetupService,
              @Inject(MAT_DIALOG_DATA) public businessLocationDetails: any) {
    // console.log(data);
  }

  ngOnInit(): void {
    this.editBillingForm = this.formBuilder.group({
      businessLocName: this.businessLocationDetails.businessLocName,
      address: this.businessLocationDetails?.address,
      apt: this.businessLocationDetails?.apt,
      city: this.businessLocationDetails?.city,
      state: this.businessLocationDetails?.state,
      postCode:this.businessLocationDetails?.postCode,
      invoiceNote: ''
    });
  }

// convenience getter for easy access to form fields
  get fmp(): any {
    return this.editBillingForm.controls;
  }


  onSubmitBillingDetails() {
    let businessDetails = {businessName: this.editBillingForm.value.businessName};

    this.editBilling.saveBusinessDetails(businessDetails).subscribe((data: any) => {
      console.log(data);
    }, (err: any) => {
      console.log(err)
    });
  }
}