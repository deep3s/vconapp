import {Component, EventEmitter, Input, Output,} from '@angular/core';
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

  @Output() onServiceSelect = new EventEmitter<any>(); // Output event
  @Output() onServiceRemove = new EventEmitter<any>();
  // Function to emit event when service is added
  addService(service: any) {
    this.onServiceSelect.emit(service);
  }
  removeService(service: any) {
    this.onServiceRemove.emit(service);
  }
  constructor(private router: Router) {}


  toggleShowAll() {
    if (!this.showAll) {
      this.router.navigate(['/service-booking']); // Navigate to service booking page
    } else {
      this.showAll = false; // Collapse the list if "Show Less" is clicked
    }
  }
}
