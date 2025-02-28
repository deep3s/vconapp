import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'addteam-members-page',
  templateUrl: './addteam-members-page.component.html',
  styleUrls: ['./addteam-members-page.component.scss']
})
export class AddteamMembersPageComponent {

  addTeamMemberForm: FormGroup;
  showSearch: boolean = false;
  submitted = false;
  showAddressName: boolean = true;
  selectedRelationship: string = '';
  selectedColor: string = '';
  selectedDetail: any;
  countries: string[] = ['United States', 'United Kingdom', 'Canada', 'India', 'Australia'];
  relationship: string[] = ['Parent', 'Spouse', 'Sibling', 'Friend', 'Daughter'];
  employmentTypes = ['Employee', 'Self-employed'];

  // showPhoneNumber: boolean = true;
  // showBirthday: boolean = true;
  // showYear: boolean = true;
  // showHint = true;
  // selectedCountry: string = '';

  colors: string[] = [
    '#A7DAF6', '#85BCE3', '#74A7DD', '#AD98E6', '#BBA7E9',
    '#E3A1E5', '#E89CB7', '#FA946B', '#FABA66', '#EAF069',
    '#A7E0A3', '#69D5C0', '#94E5F2', '#B1B7C3'
  ];

  personal = [
    { name: 'Profile', active: true },
    { name: 'Addresses', active: false },
    { name: 'Emergency Contacts', active: false },
  ];

  workspace = [
    { name: 'Services', active: false },
    { name: 'Locations', active: false },
    { name: 'Settings', active: false }
  ];

  pay = [
    { name: 'Wages and timesheets', active: false },
    { name: 'Commissions', active: false },
    { name: 'Pay runs', active: false }
  ];

  address = { street: '', city: '', state: '' };

  constructor(private fb: FormBuilder) {
    // Initializing the form
    this.addTeamMemberForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      birthDate: [''],
      year: [''],
      country: ['', Validators.required],
      relationship: ['', Validators.required],
      locations: this.fb.array([], Validators.required),
      employmentType: [''],
      address: this.fb.group({
        street: [''],
        city: [''],
        state: [''],
        locContactLink: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // 10-digit number validation
        countryCode: ['+91']
      })
    });

    // Set the default selected detail
    this.selectedDetail = this.personal[0];
  }

  get fmp(): any {
    return this.addTeamMemberForm.controls;
  }

  selectDetails(detail: any) {
    [...this.personal, ...this.workspace, ...this.pay].forEach(item => item.active = false);
    detail.active = true;
    this.selectedDetail = detail;
  }

  selectColor(color: string) {
    this.selectedColor = color;
    console.log('Selected Color:', color);
  }

  addAddress() {
    console.log('Address added:', this.address);
  }

  onSubmitAddTeamMember() {
    this.submitted = true;
    if (this.addTeamMemberForm.invalid) {
      return;
    }
    console.log('Form Submitted:', this.addTeamMemberForm.value);
  }
  locations = [
    { name: "V-Cut Men's Arekere", address: "Sundar Ram Shetty Nagar, Arekere Main Road, Bengaluru (Bilekahalli), Karnataka" },
    { name: "V-Cut Unisex Salon", address: "Pai Layout, Hulimavu Main Road, Bengaluru (Hulimavu), Karnataka" }
  ];

  calendarControl = new FormControl(false);
  permissionControl = new FormControl('Low');
  permissionLevels = ['Low', 'Medium', 'High'];

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

}