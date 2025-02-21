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
  dropdownItems: string[] = [];
  showDropdown: boolean = false;

  @ViewChild('timeDropdown') timeDropdown!: ElementRef;
  @ViewChild('dateDropdown') dateDropdown!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  categories = [
    { name: 'Hair & styling', icon: 'https://cdn-icons-png.flaticon.com/128/42/42006.png' },
    { name: 'Nails', icon: 'https://cdn-icons-png.flaticon.com/128/599/599752.png' },
    { name: 'Eyebrows & eyelashes', icon: 'https://cdn-icons-png.flaticon.com/128/17405/17405029.png' },
    { name: 'Massage', icon: 'https://cdn-icons-png.flaticon.com/128/17033/17033069.png' },
    { name: 'Barbering', icon: 'assets/icons/barber.svg' },
    { name: 'Hair removal', icon: 'assets/icons/hair-removal.svg' },
    { name: 'Facials & skincare', icon: 'assets/icons/facial.svg' },
    { name: 'Injectables & fillers', icon: 'assets/icons/fillers.svg' },
    { name: 'Body', icon: 'assets/icons/body.svg' },
    { name: 'Tattoo & piercing', icon: 'assets/icons/tattoo.svg' },
    { name: 'Makeup', icon: 'assets/icons/makeup.svg' },
    { name: 'Medical & dental', icon: 'assets/icons/medical.svg' }
  ];

  get filteredCategories() {
    return this.categories.filter(category =>
        category.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  toggleDropdown() {
    this.showDropdown = true;
  }

  hideDropdown() {
    setTimeout(() => (this.showDropdown = false), 200); // Hide dropdown after 200ms
  }

  selectCategory(category: string) {
    this.searchQuery = category;
    this.showDropdown = false;
  }

  // Date selection properties
  dateInput: string = 'Select Date'; // Default display text
  selectedDate: Date | null = null;  // Stores the selected date

  // toggleDropdown() {
  //   this.showDropdown = !this.showDropdown;
  // }

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
