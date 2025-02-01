import {Component, NgIterable} from '@angular/core';

@Component({
  selector: 'app-search-salons-page',
  templateUrl: './search-salons-page.component.html',
  styleUrls: ['./search-salons-page.component.scss']
})
export class SearchSalonsPageComponent {
    visibleLocations: (NgIterable<unknown> & NgIterable<any>) | undefined | null;
    showAll = false; // Controls "Show All" services list visibility
    services: (Array<unknown> & Array<any>) | (Array<unknown> & Iterable<any>) | (Iterable<unknown> & Array<any>) | (Iterable<unknown> & Iterable<any>) | undefined | null;

}
