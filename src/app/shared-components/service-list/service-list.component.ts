import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent {
  @Input() public services: any[];
  @Input() public title: string;
  @Input() public buttonType: string;
  @Input() public showAll = false; // Controls "Show All" services list visibility
  @Input() public seeAll = true; // Controls "Show All" services list visibility


  constructor(private router: Router) {}


  toggleShowAll() {
    if (!this.showAll) {
      this.router.navigate(['/service-booking']); // Navigate to service booking page
    } else {
      this.showAll = false; // Collapse the list if "Show Less" is clicked
    }
  }
}
