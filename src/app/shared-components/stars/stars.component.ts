import { Component, Input } from '@angular/core';

@Component({
  selector: 'stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  @Input() rating: number;

}
