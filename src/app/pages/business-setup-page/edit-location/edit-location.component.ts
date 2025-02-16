import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BusinessSetupService} from "../../../services/business-setup/business-setup.service";

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
              private editLocation: BusinessSetupService) {
    // console.log(data);
  }

  ngOnInit(): void {
    this.editLocationForm = this.formBuilder.group({
      address: [],
      apt: [],
      district: [],
      city: [],
      county: [],
      state: [],
      postcode:[],
      country: 'India',
    });
  }

// convenience getter for easy access to form fields
  get fmp(): any {
    return this.editLocationForm.controls;
  }


  onSubmitLocationDetails() {
    let businessDetails = {businessName: this.editLocationForm.value.businessName};

    this.editLocation.saveBusinessDetails(businessDetails).subscribe((data: any) => {
      console.log(data);
    }, (err: any) => {
      console.log(err)
    });
  }
  closeModal() {
    console.log('Modal Closed');
  }

}
