import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BusinessSetupService} from "../../services/business-setup/business-setup.service";

@Component({
    selector: 'app-business-setup-details-page',
    templateUrl: './business-setup-details-page.component.html',
    styleUrls: ['./business-setup-details-page.component.scss']
})
export class BusinessSetupDetailsPageComponent implements OnInit {
    businessDetails: any = {};

    constructor(private router: Router,
                private businessSetupService: BusinessSetupService) {
    }

    getBusinessDetails(): void {
        this.businessSetupService.getBusinessDetails().pipe().subscribe((businessDetails: any) => {
            this.businessDetails = businessDetails[0];
        })
    }

    ngOnInit(): void {
        this.getBusinessDetails();
    }

    editBusinessDetails(): void {
        this.router.navigate(['business-details-edit'], {state: this.businessDetails});
    }
}
