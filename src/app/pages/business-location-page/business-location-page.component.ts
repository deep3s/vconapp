import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {BusinessLocationService} from "../../services/business-location/business-location.service";
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-business-location-page',
    templateUrl: './business-location-page.component.html',
    styleUrls: ['./business-location-page.component.scss']
})
export class BusinessLocationPageComponent {
    businessLocations: any = [];
    showModal = false;
    imports: [NgbDropdownModule];
    businessSetup: any = {};
    details = [
        {name: 'Business details', active: false},
        {name: 'Locations', active: false},
        {name: 'Client sources', active: false}
    ];

    settings = [
        {name: 'Service menu', active: false},
        {name: 'Product list', active: false},
        {name: 'Memberships', active: false},
        {name: 'Client list', active: false}
    ];


    navigateToBusinessSetup() {
        this.router.navigate(['./business-setup']); // Change the route path accordingly
    }

    viewLocation(businessLocation:any) {
        this.router.navigate(['./business-setup'],{state: businessLocation}); // Change the route path accordingly
    }


    constructor(private router: Router,
                private businessLocationService: BusinessLocationService) {
        this.getAllBusinessLocations();
    }

    getAllBusinessLocations(): void {
        this.businessLocationService.getAllBusinessLocations().pipe().subscribe(
            (locations: any) => {
                this.businessLocations = locations;
            }
        )
    }


    selectDetails(item: any) {
        this.details.forEach(detail => detail.active = false);
        this.settings.forEach(setting => setting.active = false);
        item.active = true;
    }

    copyShareLink(event: Event) {
        event.preventDefault(); // Prevents any unintended behavior
        const shareLink = "https://yourwebsite.com/share"; // Replace with the actual share link
        navigator.clipboard.writeText(shareLink).then(() => {
            alert("Share link copied!");
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    }

    editBusinessDetails(): void {
        this.router.navigate(['business-setup'], { state: this.businessSetup });
    }

}
