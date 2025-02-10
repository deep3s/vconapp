import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: []
})
export class EditLocationComponent {
  location = {
    address: '',
    apt: '',
    district: '',
    city: '',
    county: '',
    state: '',
    postcode: '',
    country: 'India',
    directions: ''
  };


  closeModal() {
    console.log('Modal Closed');
  }

  saveLocation() {
    console.log('Location Saved:', this.location);
  }


}
