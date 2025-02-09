import {Component, Input} from '@angular/core';

@Component({
  selector: 'salon-cart',
  templateUrl: './salon-cart.component.html',
  styleUrls: ['./salon-cart.component.scss']
})
export class SalonCartComponent {
  @Input() addedServices: any =[];

  getTotal() {
    const total = this.addedServices.reduce((total, service) => total + service.price, 0);
    const discount = total * 0.25; // 25% discount
    return total - discount;
  }
}
