import { Component } from '@angular/core';

@Component({
  selector: 'salon-details-card',
  templateUrl: './salon-details-card.component.html',
  styleUrls: ['./salon-details-card.component.scss']
})
export class SalonDetailsCardComponent {
  isOpen = true; // State for salon's open/closed status (default to 'open')


  private router: any;

  bookNow() {
    console.log('Booking initiated!');
    this.router.navigate(['/booking']);
  }

  makeCall() {
    window.location.href = 'tel:+919876543210';  // Replace with actual number
  }
}
