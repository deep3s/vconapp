import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  submenuSearchText = '';
  hasSearch = false;

  // Dropdown state
  showServicesDropdown = false;
  selectedService = '';

  ngOnInit() {
    // Initialize flatpickr for date and time
    this.initializeFlatpickr();
  }

  // Toggle dropdown visibility for services
  toggleServicesDropdown() {
    this.showServicesDropdown = !this.showServicesDropdown;
  }

  // Select a service from the dropdown
  selectService(service: string) {
    this.selectedService = service;
    this.showServicesDropdown = false;
  }

  // Initialize Flatpickr for date and time pickers
  initializeFlatpickr() {
    flatpickr("#datePicker", {
      dateFormat: "Y-m-d", // Format: Year-Month-Day
      minDate: "today",    // Disable past dates
    });

    flatpickr("#timePicker", {
      enableTime: true,     // Enable time selection
      noCalendar: true,     // Disable calendar view
      dateFormat: "h:i K",  // Format: Hour:Minute AM/PM
    });
  }

  // Perform search
  submenuSearch() {
    console.log('Search initiated with:', {
      service: this.selectedService,
      location: (document.getElementById('locationInput') as HTMLInputElement).value,
      date: (document.getElementById('datePicker') as HTMLInputElement).value,
      time: (document.getElementById('timePicker') as HTMLInputElement).value,
    });
  }

  // Clear search
  clearSearch() {
    this.submenuSearchText = '';
    this.selectedService = '';
    (document.getElementById('locationInput') as HTMLInputElement).value = '';
    (document.getElementById('datePicker') as HTMLInputElement).value = '';
    (document.getElementById('timePicker') as HTMLInputElement).value = '';
  }
}
