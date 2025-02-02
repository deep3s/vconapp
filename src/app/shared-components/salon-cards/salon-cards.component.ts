import {Component, Input} from '@angular/core';

@Component({
  selector: 'salon-cards',
  templateUrl: './salon-cards.component.html',
  styleUrls: ['./salon-cards.component.scss']
})
export class SalonCardsComponent {
@Input() salons: any;
@Input() title: string;
}
