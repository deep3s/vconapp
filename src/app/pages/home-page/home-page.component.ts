import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
    userCurrentLocation: any = {};
    salons = [

        {
            name: 'V-cut Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/437841/1995450/2d8a39d4-2c1b-4109-a46a-e39681dfbdb1-Blown-Indiranagar-IN-Karnataka-Bangalore-Indiranagar-Fresha.jpg?class=venue-gallery-large',
            address: 'Hulimavu, Bangalore',
            deals: 'Beauty Salon',
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
            name: 'Naturals Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/526451/708080/25deb95e-6c98-4d2a-8b71-e688230f8157.jpg?class=width-small`1',
            address: 'Jayanagar, Bangalore',
            deals: 'Hair Salon',
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
            name: 'EEva-Prestige Group',
            image: 'https://images.fresha.com/locations/location-profile-images/957847/1053050/7c4a51c9-edb7-4f84-b47b-64aec31c06b8.jpg?class=width-small',
            address: 'Akshaynagar, Bangalore',
            deals: 'Beauty Salon',
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
            name: 'Relaxme Spa',
            image: 'https://images.fresha.com/locations/location-profile-images/304012/658244/a6d9a94c-52ca-4f05-875e-dd3fc568979c.jpg?class=width-small',
            address: 'Kormangala, Bangalore',
            deals: 'Massage',
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

    recommendedSalons = [
        {
            name: 'V-cut Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/36756/1876918/958f0636-f31d-4572-a297-becec37fb03f.jpg?class=venue-gallery-small&class=width-small',
            address: 'Hulimavu, Bangalore',
            deals: 'Beauty Salon',
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
            name: 'Naturals Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/526451/708080/25deb95e-6c98-4d2a-8b71-e688230f8157.jpg?class=width-small`1',
            address: 'Jayanagar, Bangalore',
            deals: 'Hair Salon',
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
            name: 'EEva-Prestige Group',
            image: 'https://images.fresha.com/locations/location-profile-images/957847/1053050/7c4a51c9-edb7-4f84-b47b-64aec31c06b8.jpg?class=width-small',
            address: 'Akshaynagar, Bangalore',
            deals: 'Beauty Salon',
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
            name: 'Relaxme Spa',
            image: 'https://images.fresha.com/locations/location-profile-images/304012/658244/a6d9a94c-52ca-4f05-875e-dd3fc568979c.jpg?class=width-small',
            address: 'Kormangala, Bangalore',
            deals: 'Massage',
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

    newSalons = [
        {
            name: 'V-cut Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/437841/1995450/2d8a39d4-2c1b-4109-a46a-e39681dfbdb1-Blown-Indiranagar-IN-Karnataka-Bangalore-Indiranagar-Fresha.jpg?class=venue-gallery-large',
            address: 'Hulimavu, Bangalore',
            deals: 'Beauty Salon',
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
            name: 'Naturals Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/526451/708080/25deb95e-6c98-4d2a-8b71-e688230f8157.jpg?class=width-small`1',
            address: 'Jayanagar, Bangalore',
            deals: 'Hair Salon',
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
            name: 'EEva-Prestige Group',
            image: 'https://images.fresha.com/locations/location-profile-images/957847/1053050/7c4a51c9-edb7-4f84-b47b-64aec31c06b8.jpg?class=width-small',
            address: 'Akshaynagar, Bangalore',
            deals: 'Beauty Salon',
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
            name: 'Relaxme Spa',
            image: 'https://images.fresha.com/locations/location-profile-images/304012/658244/a6d9a94c-52ca-4f05-875e-dd3fc568979c.jpg?class=width-small',
            address: 'Kormangala, Bangalore',
            deals: 'Massage',
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
    trendingSalons = [
        {
            name: 'V-cut Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/437841/1995450/2d8a39d4-2c1b-4109-a46a-e39681dfbdb1-Blown-Indiranagar-IN-Karnataka-Bangalore-Indiranagar-Fresha.jpg?class=venue-gallery-large',
            address: 'Hulimavu, Bangalore',
            deals: 'Beauty Salon',
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
            name: 'Naturals Salon',
            image: 'https://images.fresha.com/locations/location-profile-images/526451/708080/25deb95e-6c98-4d2a-8b71-e688230f8157.jpg?class=width-small`1',
            address: 'Jayanagar, Bangalore',
            deals: 'Hair Salon',
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
            name: 'EEva-Prestige Group',
            image: 'https://images.fresha.com/locations/location-profile-images/957847/1053050/7c4a51c9-edb7-4f84-b47b-64aec31c06b8.jpg?class=width-small',
            address: 'Akshaynagar, Bangalore',
            deals: 'Beauty Salon',
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
            name: 'Relaxme Spa',
            image: 'https://images.fresha.com/locations/location-profile-images/304012/658244/a6d9a94c-52ca-4f05-875e-dd3fc568979c.jpg?class=width-small',
            address: 'Kormangala, Bangalore',
            deals: 'Massage',
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
    reviews = [
        {
            name: 'Lucy',
            location: 'London, UK',
            image: '/assets/_next/static/images/lucy-dd851e4ecc40b9b59b624cdccc1aedb6.jpg',
            rating: 5,
            title: 'The best booking system',
            comment: 'Great experience, easy to book. Paying for treatments is so convenient — no cash or cards needed!'
        }
    ];

    constructor(public router: Router) {
    }

    ngOnInit(): void {
        this.getLocation();
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: GeolocationPosition) => {
                    this.userCurrentLocation.lat = position.coords.latitude;
                    this.userCurrentLocation.lng = position.coords.longitude;
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













