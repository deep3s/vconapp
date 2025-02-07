import { Component } from '@angular/core';

@Component({
  selector: 'browse-city',
  templateUrl: './browse-city.component.html',
  styleUrls: ['./browse-city.component.scss']
})
export class BrowseCityComponent {
  stars = Array(5).fill(0);

}
