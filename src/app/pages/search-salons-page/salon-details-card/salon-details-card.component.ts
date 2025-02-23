import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'salon-details-card',
  templateUrl: './salon-details-card.component.html',
  styleUrls: ['./salon-details-card.component.scss']
})
export class SalonDetailsCardComponent {
  @Input() salon:any;

  constructor(private  router: Router) { }

  bookSalon(): void{
    this.router.navigateByUrl('salon-details');
  }

}
