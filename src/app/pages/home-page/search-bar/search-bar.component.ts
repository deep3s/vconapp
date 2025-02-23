import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchQuery: string = '';
  locationInput: string = 'Current Location';
  timeInput: string = 'Any time';
  showTimeDropdown: boolean = false;
  showDateDropdown: boolean = false;
  selectedTimeRange = { from: '', to: '' };
  dropdownItems: string[] = ['All treatments', 'Hair & Styling', 'Nails', 'Eyebrows & Eyelashes'];
  showDropdown: boolean = false;

  @ViewChild('timeDropdown') timeDropdown!: ElementRef;
  @ViewChild('dateDropdown') dateDropdown!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  // Date selection properties
  dateInput: string = 'Select Date'; // Default display text
  selectedDate: Date | null = null;  // Stores the selected date

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  selectItem(item: string) {
    this.searchQuery = item;
    this.showDropdown = false;
  }

  focusSearchInput() {
    this.searchInput.nativeElement.focus();
  }

  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            this.locationInput = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`;
          },
          (error) => {
            console.error('Error getting location:', error);
            this.locationInput = 'Location unavailable';
          }
      );
    } else {
      this.locationInput = 'Geolocation not supported';
    }
  }

  // 📅 Toggle date dropdown
  toggleDateDropdown() {
    this.showDateDropdown = !this.showDateDropdown;
  }

  // 📅 Handle date selection from Material Calendar
  onDateChange(date: Date | null) {
    if (date) {
      this.selectedDate = date;
      this.dateInput = date.toLocaleDateString(); // Convert to readable format
      this.showDateDropdown = false; // Hide dropdown after selection
    }
  }

  // ⏰ Toggle time dropdown
  toggleTimeDropdown() {
    this.showTimeDropdown = !this.showTimeDropdown;
  }

  // ⏰ Handle time selection (Predefined options)
  selectTimeOption(option: string) {
    this.timeInput = option;

    switch (option) {
      case 'Morning':
        this.selectedTimeRange = { from: '06:00', to: '12:00' };
        break;
      case 'Afternoon':
        this.selectedTimeRange = { from: '12:00', to: '17:00' };
        break;
      case 'Evening':
        this.selectedTimeRange = { from: '17:00', to: '00:00' };
        break;
      default:
        this.selectedTimeRange = { from: '', to: '' }; // Any time
        break;
    }
  }
}
