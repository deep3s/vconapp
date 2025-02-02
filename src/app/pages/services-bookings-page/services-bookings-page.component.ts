import { Component } from '@angular/core';
import {Router} from "@angular/router";

interface Service {
    name: string;
    duration: string;
    price: number;
    discount: number;
}

@Component({
    selector: 'app-services-bookings-page',
    templateUrl: './services-bookings-page.component.html',
    styleUrls: ['./services-bookings-page.component.scss'],
})
export class ServicesBookingsPageComponent {
    services: Service[] = [
        { name: 'Female to male massage', duration: '30 mins', price: 2010, discount: 33 },
        { name: 'Swedish Massage', duration: '30 mins', price: 1500, discount: 25 },
        { name: 'Deep Tissue Massage', duration: '30 mins', price: 1500, discount: 25 },
        { name: 'Therapeutic Massage', duration: '30 mins', price: 1500, discount: 25 },
        { name: 'Reflexology', duration: '30 mins', price: 1000, discount: 50 },
    ];
    showAll = false; // Controls "Show All" services list visibility
    constructor(private router: Router) {}
    selectedServices: Service[] = [];

    addService(service: Service) {
        if (!this.selectedServices.includes(service)) {
            this.selectedServices.push(service);
        }
    }

    removeService(service: Service) {
        this.selectedServices = this.selectedServices.filter(s => s !== service);
    }

    getTotal(): number {
        return this.selectedServices.reduce((sum, service) => sum + service.price, 0);
    }

    onServiceClick(service: any) {
        console.log('Service clicked:', service);
        this.router.navigate(['service-details'], { queryParams: { id: service.id } });
    }

    // Toggle "Show All" services list
    toggleShowAll() {
        this.showAll = !this.showAll;
        console.log('Show all services:', this.showAll);
    }
}
