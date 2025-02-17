import { Component } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'addteam-members-page',
  templateUrl: './addteam-members-page.component.html',
  styleUrls: ['./addteam-members-page.component.scss']
})
export class AddteamMembersPageComponent {
  personal: any = [
    {name: 'Profile', active: true},
    {name: 'Addresses',active: false},
    {name: 'Emergency Contacts',active: false},
  ];

  workspace: any = [
    {name: 'Services',active: false},
    {name: 'Locations',active: false},
    {name: 'Settings',active: false}
  ];

  pay: any = [
    {name: 'Wages and timesheets',active: false},
    {name:'Commissions',active: false},
    {name:'Pay runs',active: false}
  ];

  selectedDetails: any = this.personal[0];

  selectDetails(selected: any) {
    this.personal.forEach(item => item.active = false);
    this.workspace.forEach(item => item.active = false);
    this.pay.forEach(item => item.active = false);

    selected.active = true;
    this.selectedDetails = selected;
  }

  submitted = false;
  userForm: FormGroup;
  get fmp(): any {
    return this.userForm.controls;
  }
  showPhoneNumber: boolean = true;

  showBirthday: boolean = true; // Toggle this to show/hide Birthday input
  showYear: boolean = true; // Toggle this to show/hide Year input
  selectedCountry: string = '';
  countries: string[] = ['United States', 'United Kingdom', 'Canada', 'India', 'Australia'];

  colors: string[] = [
    '#A7DAF6', '#85BCE3', '#74A7DD', '#AD98E6', '#BBA7E9',
    '#E3A1E5', '#E89CB7', '#FA946B', '#FABA66', '#EAF069',
    '#A7E0A3', '#69D5C0', '#94E5F2', '#B1B7C3'
  ];

  selectedColor: string = '';

  selectColor(color: string) {
    this.selectedColor = color;
    console.log('Selected Color:', color);  // Debugging in the console
  }

  employmentTypes = ['Employee', 'Self-employeed'];
  showHint = true;

}