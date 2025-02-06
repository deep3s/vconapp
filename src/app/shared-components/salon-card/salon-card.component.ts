import {Component, Input} from '@angular/core';

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
}
