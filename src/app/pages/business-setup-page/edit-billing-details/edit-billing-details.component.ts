import { Component } from '@angular/core';

@Component({
  selector: 'edit-billing-details',
  templateUrl: './edit-billing-details.component.html',
  styleUrls: ['./edit-billing-details.component.scss']
})
export class EditBillingDetailsComponent {
  companyName = "";
  address = "";
  city = "";
  state = "";
  postcode = "";
  invoiceNote = "";
}
