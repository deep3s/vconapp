import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'service-booking',
  templateUrl: './service-booking.component.html',
  styleUrls: ['./service-booking.component.scss']
})
export class ServiceBookingComponent {
  @Input() serviceType: any;
  @Output() onServiceSelect = new EventEmitter<unknown>();
  @Input() public buttonType: string;
  cart: any[] = [];
  @Output() onServiceRemove = new EventEmitter<unknown>();
  constructor(private router: Router) {
  }

  onServiceClick(service: any) {
    console.log('Service clicked:', service);
    this.router.navigate(['service-details'], {queryParams: {id: service.id}});
  }

  toggleService(service: any) {
    if (this.isSelected(service)) {
      this.cart = this.cart.filter(item => item !== service);
    } else {
      this.cart.push(service);
    }
  }

  addService(service: any) {
    this.onServiceSelect.emit(service);
  }
  removeService(service: any) {
    this.onServiceRemove.emit(service);
  }

  isSelected(service: any) {
    return this.cart.includes(service);
  }

}
