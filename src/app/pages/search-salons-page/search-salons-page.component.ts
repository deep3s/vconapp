import {Component, NgIterable} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-search-salons-page',
    templateUrl: './search-salons-page.component.html',
    styleUrls: ['./search-salons-page.component.scss']
})
export class SearchSalonsPageComponent {
    latitude: number;
    longitude: number;
    salons = [
        {
        name: 'V-cut Salon',
        image: 'https://images.fresha.com/locations/location-profile-images/333200/304740/88306814-2894-45a1-a253-2778723d598c.jpg?class=width-small',
        address: 'Hulimavu, Bangalore',
        distance: '12 km',
        services: [
            {name: 'Female to male massage', duration: '30 mins', price: 2010, nextSlots: ['1:50 pm', '2:50 pm'],},
            {name: 'Swedish Massage', duration: '30 mins', price: 1500, nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],},
            {name: 'Deep Tissue Massage', duration: '30 mins', price: 1500, nextSlots: ['1:50 pm', '2:50 pm',],},
            {
                name: 'Therapeutic Massage',
                duration: '30 mins',
                price: 1500,
                nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],
            },
            {name: 'Reflexology', duration: '30 mins', price: 1000, nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],},
        ],

    },
        {
            name: 'V-cut Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/526451/708080/25deb95e-6c98-4d2a-8b71-e688230f8157.jpg?class=width-small`1',
            address: 'Hulimavu, Bangalore',
            distance: '12 km',
            services: [
                {name: 'Female to male massage', duration: '30 mins', price: 2010, nextSlots: ['1:50 pm', '2:50 pm'],},
                {
                    name: 'Swedish Massage',
                    duration: '30 mins',
                    price: 1500,
                    nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],
                },
                {name: 'Deep Tissue Massage', duration: '30 mins', price: 1500, nextSlots: ['1:50 pm', '2:50 pm',],},
                {
                    name: 'Therapeutic Massage',
                    duration: '30 mins',
                    price: 1500,
                    nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],
                },
                {name: 'Reflexology', duration: '30 mins', price: 1000, nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],},
            ],

        },

        {
            name: 'V-cut Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/957847/1053050/7c4a51c9-edb7-4f84-b47b-64aec31c06b8.jpg?class=width-small',
            address: 'Hulimavu, Bangalore',
            distance: '12 km',
            services: [
                {name: 'Female to male massage', duration: '30 mins', price: 2010, nextSlots: ['1:50 pm', '2:50 pm'],},
                {
                    name: 'Swedish Massage',
                    duration: '30 mins',
                    price: 1500,
                    nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],
                },
                {name: 'Deep Tissue Massage', duration: '30 mins', price: 1500, nextSlots: ['1:50 pm', '2:50 pm',],},
                {
                    name: 'Therapeutic Massage',
                    duration: '30 mins',
                    price: 1500,
                    nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],
                },
                {name: 'Reflexology', duration: '30 mins', price: 1000, nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],},
            ],

        },

        {
            name: 'V-cut Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/304012/658244/a6d9a94c-52ca-4f05-875e-dd3fc568979c.jpg?class=width-small',
            address: 'Hulimavu, Bangalore',
            distance: '12 km',
            services: [
                {name: 'Female to male massage', duration: '30 mins', price: 2010, nextSlots: ['1:50 pm', '2:50 pm'],},
                {
                    name: 'Swedish Massage',
                    duration: '30 mins',
                    price: 1500,
                    nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],
                },
                {name: 'Deep Tissue Massage', duration: '30 mins', price: 1500, nextSlots: ['1:50 pm', '2:50 pm',],},
                {
                    name: 'Therapeutic Massage',
                    duration: '30 mins',
                    price: 1500,
                    nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],
                },
                {name: 'Reflexology', duration: '30 mins', price: 1000, nextSlots: ['1:50 pm', '2:50 pm', '3:50 pm'],},
            ],

        },

    ];

    constructor(private router: Router) {
        setTimeout(() => {
            this.getLocation();
        }, 500)
    }

    initMap1(lat:number, lng:number) {
        // @ts-ignore
        const map = new mappls.Map('map', {center: [lat, lng]});
        map.setZoom(15);
        // @ts-ignore
        mappls.setStyle('grey-day');
    }

    onServiceClick(service: any) {
        console.log('Service clicked:', service);
        this.router.navigate(['service-details'], {queryParams: {id: service.id}});
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.initMap1(this.latitude, this.longitude);
                    console.error('Current location:', this.latitude, this.longitude);

                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

}
