import {Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild} from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime, Observable, switchMap } from "rxjs";
import { MapplsService } from "../../../services/mappls/mappls.service";
import { OlaMapsService } from "../../../services/olamaps/olamaps.service";
import {Router} from "@angular/router";

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() currentLocation: any = {};

  searchQuery: string = '';
  locationInput: string = 'Current Location';
  showTimeDropdown: boolean = false;
  showDateDropdown: boolean = false;
  selectedTimeRange = { from: '', to: '' };
  showDropdown: boolean = false;
  businessLocationForm: FormGroup;
  submitted = false;
  timeInput: string = 'Select Time'; // Default input value

  @Output() locationBasicsSaved = new EventEmitter();
  @ViewChild('timeDropdown') timeDropdown!: ElementRef;
  @ViewChild('dateDropdown') dateDropdown!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  allCategories = [
    { name: 'Hair & Styling', icon: 'content_cut' },
    { name: 'Nails', icon: 'spa' },
    { name: 'Eyebrows & Eyelashes', icon: 'remove_red_eye' },
    { name: 'Massage', icon: 'self_improvement' },
    { name: 'Barbering', icon: 'face_retouching_natural' },
    { name: 'Hair Removal', icon: 'straighten' },
    { name: 'Facials & Skincare', icon: 'emoji_nature' },
    { name: 'Injectables & Fillers', icon: 'medication' },
    { name: 'Body Treatments', icon: 'spa' },
    { name: 'Tattoo & Piercing', icon: 'brush' },
    { name: 'Makeup', icon: 'face' },
    { name: 'Medical & Dental', icon: 'medical_services' }
  ];

  topCategories = [
    { name: 'Barbering', icon: 'face_retouching_natural' },
    { name: 'Tattoo & Piercing', icon: 'brush' },
    { name: 'Makeup', icon: 'face' },
    { name: 'Medical & Dental', icon: 'medical_services' }
  ];

  filteredCategories = [...this.allCategories]; // Default to all categories

  onSearch(): void{
    this.router.navigate(['/search'],{state: {...this.currentLocation, radius: 3}});
  }

  toggleDropdown(): void {
    this.showDropdown = true;
  }
  showAllCategories(event: Event): void {
    event.stopPropagation();
    this.filteredCategories = [...this.allCategories];
    this.showDropdown = true;
  }

  showTopCategories(event: Event): void {
    event.stopPropagation();
    this.filteredCategories = [...this.topCategories];
    this.showDropdown = true;
  }

  selectCategory(categoryName: string): void {
    this.searchQuery = categoryName;
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }


  hideDropdown(): void {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200); // Delay to allow category selection before closing
  }

  dropdownItems: string[] ;

  dateInput: string = 'Select Date';
  selectedDate: Date | null = null;

  selectItem(item: string) {
    this.searchQuery = item;
    this.showDropdown = false;
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

  locationSearchResults: any = [];
  selectedLocation = '';

  searchControl = new FormControl('');
  options: string[] = [];
  suggestions: Observable<any[]>;

  constructor(private mapplsService: MapplsService,
              private router: Router,
              private olaMapsService: OlaMapsService) {

  }

  ngOnInit() {
    this.suggestions = this.searchControl.valueChanges.pipe(
        debounceTime(300),
        switchMap(filterValue => this.olaMapsService.getSuggestions(filterValue || ''))
    );
  }

  selectSuggestion(suggestion: any) {
    this.selectedLocation = suggestion;
  }




  onDateChange(date: Date | null) {
    if (date) {
      this.selectedDate = date;
      this.dateInput = date.toLocaleDateString();
      this.showDateDropdown = false;
    }
  }

  // Predefined time slots
  timeSlots = {
    'Any time': { from: '', to: '' },
    'Morning': { from: '08:00', to: '12:00' },
    'Afternoon': { from: '12:00', to: '16:00' },
    'Evening': { from: '16:00', to: '20:00' }
  };

  // Toggle the time dropdown
  toggleTimeDropdown(): void {
    this.showTimeDropdown = !this.showTimeDropdown;
  }

  // Select predefined time option
  selectTimeOption(option: string): void {
    this.selectedTimeRange = { ...this.timeSlots[option] }; // Set time range
  }

  // Update input when time is manually selected
  updateTimeInput(): void {
    if (this.selectedTimeRange.from && this.selectedTimeRange.to) {
      this.timeInput = `From ${this.selectedTimeRange.from} to ${this.selectedTimeRange.to}`;
    }
  }


  onSubmitBusinessLocation() {
    this.submitted = true;
    if (this.businessLocationForm && this.businessLocationForm.valid) {
      this.locationBasicsSaved.emit(this.businessLocationForm.value);
    }
  }

  toggleDateDropdown() {
    this.showDateDropdown = !this.showDateDropdown;
    this.showTimeDropdown = false;
  }

  @HostListener('document:mousedown', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;

    // Check if click is inside the dropdown or search input
    if (target.closest('.dropdown-menu-custom') || target.closest('.search-input')) {
      return; // Don't close if inside dropdown or input
    }

    // Close time dropdown if clicked outside
    if (!target.closest('.time-dropdown') && !target.closest('.time-toggle')) {
      this.showTimeDropdown = false;
    }

    // Close date dropdown if clicked outside
    if (!target.closest('.date-dropdown') && !target.closest('.date-toggle')) {
      this.showDateDropdown = false;
    }

    // Delay closing dropdown to allow category selection
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }
  formControl: FormControl<Date | null>;

  // constructor() {
  //   const initialValue = new Date();
  //   initialValue.setHours(12, 30, 0);
  //   this.formControl = new FormControl(initialValue);
  // }

}
































/*
showTimeDropdown = false;
selectedTimeOption = '';
selectedTimeRange = { from: '', to: '' };

timeOptions = ['Any time', 'Morning', 'Afternoon', 'Evening'];

timeSlots: string[] = [
  '12:00 AM', '12:30 AM', '1:00 AM', '1:30 AM', '2:00 AM',
  '2:30 AM', '3:00 AM', '3:30 AM', '4:00 AM', '4:30 AM',
  '5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM',
  '7:30 AM', '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
  '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM',
  '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM',
  '10:30 PM', '11:00 PM', '11:30 PM'
];

toggleTimeDropdown() {
  this.showTimeDropdown = !this.showTimeDropdown;
}

selectTimeOption(option: string) {
  this.selectedTimeOption = option;

  switch (option) {
    case 'Any time':
      this.selectedTimeRange = { from: '', to: '' };
      break;
    case 'Morning':
      this.selectedTimeRange = { from: '6:00 AM', to: '11:59 AM' };
      break;
    case 'Afternoon':
      this.selectedTimeRange = { from: '12:00 PM', to: '5:59 PM' };
      break;
    case 'Evening':
      this.selectedTimeRange = { from: '6:00 PM', to: '11:59 PM' };
      break;
  }
}

@HostListener('document:click', ['$event'])
closeDropdown(event: Event) {
  const target = event.target as HTMLElement;
  if (!target.closest('.time-dropdown') && !target.closest('.time-toggle')) {
    this.showTimeDropdown = false;
  }
}*/
