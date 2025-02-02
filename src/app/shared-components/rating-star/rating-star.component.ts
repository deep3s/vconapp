import { Component, Input } from '@angular/core';

@Component({
  selector: 'rating-star',
  templateUrl: './rating-star.component.html',
  styleUrls: ['./rating-star.component.scss']
})
export class RatingStarComponent {
  @Input() rating: number;
  @Input() tnr: number;
  @Input() showRating = true;
  @Input() showTnr = true;

}
