import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'salon-card',
  templateUrl: './salon-card.component.html',
  styleUrls: ['./salon-card.component.scss']
})
export class SalonCardComponent {
@Input() salon: any;
@Input() recommendedSalon: any;
@Input() newSalon: any;
@Input() trendingSalons: any;

constructor(private router:  Router) {
}

  redirectToDetails() {
    this.router.navigateByUrl("/salon-details");
  }
}
