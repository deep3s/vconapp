import {Component, Input} from '@angular/core';

@Component({
    selector: 'category-services',
    templateUrl: './category-services.component.html',
    styleUrls: ['./category-services.component.scss']
})
export class CategoryServicesComponent {
    @Input() public category: any;


}
