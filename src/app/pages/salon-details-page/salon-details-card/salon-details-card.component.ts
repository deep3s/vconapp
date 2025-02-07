import { Component } from '@angular/core';

@Component({
  selector: 'salon-details-card',
  templateUrl: './salon-details-card.component.html',
  styleUrls: ['./salon-details-card.component.scss']
})
export class SalonDetailsCardComponent {

  showHours = false;

  hours = [
    { day: 'Monday', time: '10:00 am - 7:00 pm' },
    { day: 'Tuesday', time: '10:00 am - 7:00 pm' },
    { day: 'Wednesday', time: '10:00 am - 7:00 pm' },
    { day: 'Thursday', time: '10:00 am - 7:00 pm' },
    { day: 'Friday', time: '10:00 am - 7:00 pm' },
    { day: 'Saturday', time: '10:00 am - 7:00 pm' },
    { day: 'Sunday', time: '10:00 am - 7:00 pm' }
  ];

  toggleHours() {
    this.showHours = !this.showHours;
  }
  makeCall() {
    window.location.href = 'tel:+919876543210';  // Replace with actual number
  }
}
