import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-service-booking',
  templateUrl: './service-booking.component.html',
  styleUrls: ['./service-booking.component.scss']
})
export class ServiceBookingComponent {
  @Input() name: string = '';
  @Input() duration: string = '';
  @Input() price: number = 0;
  @Input() discount: string = '';

  bookService() {
      console.log('Booking now...');
      // You can implement your logic here for booking
    }

}
