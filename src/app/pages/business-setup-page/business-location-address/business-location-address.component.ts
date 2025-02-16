import { Component } from '@angular/core';
import {MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'business-location-address',
  templateUrl: './business-location-address.component.html',
  standalone: true,
  imports:[MatCheckboxModule],
  styleUrls: ['./business-location-address.component.scss']
})
export class BusinessLocationAddressComponent {

}
