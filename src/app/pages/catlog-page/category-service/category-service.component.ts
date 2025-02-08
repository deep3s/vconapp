import {Component, Input} from '@angular/core';

@Component({
  selector: 'category-service',
  templateUrl: './category-service.component.html',
  styleUrls: ['./category-service.component.scss']
})
export class CategoryServiceComponent {
  @Input() public service:any;
  editService(service: any) {
    console.log("Edit:", service);
  }

  deleteService(service: any) {
    console.log("Delete:", service);
  }

  archiveService(service: any) {
    console.log("Archive:", service);
  }

}
