import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  searchQuery: string = '';
  locationInput: string = '';
  dateInput: string = '';
  selectedTime: string = 'Any time';
  timeFrom: string = '';
  timeTo: string = '';
  showTimeDropdown: boolean = false;

  timeSlots: string[] = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

  @ViewChild('dateInput') dateInputRef!: ElementRef;

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

  openDatePicker() {
    this.dateInputRef.nativeElement.showPicker();
  }

  toggleTimeDropdown() {
    this.showTimeDropdown = !this.showTimeDropdown;
  }

  setTime(time: string) {
    this.selectedTime = time;
    this.showTimeDropdown = false;
  }
}
