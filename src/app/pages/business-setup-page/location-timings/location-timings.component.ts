import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'location-timings',
  templateUrl: './location-timings.component.html',
  styleUrls: ['./location-timings.component.scss']
})
export class LocationTimingsComponent implements OnInit {
  days = [
    { name: 'Monday', open: false, openingTime: '10:00am', closingTime: '7:00pm' },
    { name: 'Tuesday', open: false, openingTime: '10:00am', closingTime: '7:00pm' },
    { name: 'Wednesday', open: false, openingTime: '10:00am', closingTime: '7:00pm' },
    { name: 'Thursday', open: false, openingTime: '10:00am', closingTime: '7:00pm' },
    { name: 'Friday', open: false, openingTime: '10:00am', closingTime: '7:00pm' },
    { name: 'Saturday', open: false, openingTime: '10:00am', closingTime: '5:00pm' },
    { name: 'Sunday', open: false, openingTime: '10:00am', closingTime: '5:00pm' },
  ];

  timeSlots = [
    '12:00am', '1:00am', '2:00am', '3:00am', '4:00am', '5:00am', '6:00am', '7:00am', '8:00am', '9:00am', '10:00am',
    '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm', '4:00pm', '5:00pm', '6:00pm', '7:00pm', '8:00pm', '9:00pm', '10:00pm', '11:00pm'
  ];

  ngOnInit() {
    const savedDays = localStorage.getItem('openingHours');
    if (savedDays) {
      this.days = JSON.parse(savedDays);
    }
  }

  toggleDay(day: any) {
    day.open = !day.open;
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('openingHours', JSON.stringify(this.days));
  }
}