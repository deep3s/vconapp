import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'service-booking',
  templateUrl: './service-booking.component.html',
  styleUrls: ['./service-booking.component.scss']
})
export class ServiceBookingComponent {
  @Input() serviceType: any;
  constructor(private router: Router) {
  }
  bookService() {
      console.log('Booking now...');
      // You can implement your logic here for booking
    }
  onServiceClick(service: any) {
    console.log('Service clicked:', service);
    this.router.navigate(['service-details'], {queryParams: {id: service.id}});
  }



}
