import {Component, Input} from '@angular/core';

@Component({
  selector: 'salon-details-card',
  templateUrl: './salon-details-card.component.html',
  styleUrls: ['./salon-details-card.component.scss']
})
export class SalonDetailsCardComponent {
  @Input() salon:any;


}
