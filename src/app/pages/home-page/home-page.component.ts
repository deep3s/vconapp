import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

import {Router} from "@angular/router";

// @ts-ignore
import {VconService} from "src/app/services/vcon/vcon.service";

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
    // Form Controls
    treatmentControl = new FormControl('');
    locationControl = new FormControl('');
    form = new FormGroup({
        date: new FormControl(),
        time: new FormControl()
    });

    // Data Lists
    treatmentsList: string[] = ['Haircut', 'Facial', 'Manicure', 'Pedicure', 'Waxing'];
    locationsList: string[] = ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'];
    timeList: string[] = [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM',
        '06:00 PM',
        '07:00 PM',
        '08:00 PM',
        '09:00 PM'
    ];

    // Filtered Options
    filteredTreatments!: Observable<string[]>;
    filteredLocations!: Observable<string[]>;

    // Carousel Data
    // cards = [
    //
    //     {
    //         id: 1,
    //         name: null,
    //         address: "hulimavu",
    //         nearby: "sai ram hospital",
    //         imageUrls: "https://images.app.goo.gl/cD89ehzh5vWUSseg7"
    //     },
    //     {
    //         id: 2,
    //         name: null,
    //         address: "jp nagar",
    //         nearby: "style up",
    //         imageUrls: "https://images.app.goo.gl/cHsk9x8RXHTdFSNG8"
    //     },
    //     {
    //         id: 3,
    //         name: null,
    //         address: "hulimavu",
    //         nearby: "muthoot finance",
    //         imageUrls: "https://images.app.goo.gl/g5N81BH3URRkuGPP7"
    //     },
    //     {
    //         id: 4,
    //         name: null,
    //         address: "DLF",
    //         nearby: "venkateshwara",
    //         imageUrls: "https://images.app.goo.gl/NwakhCNwhJTkHTyd7"
    //     }
    // ];

    constructor(public vonService: VconService, public router: Router) {
    }

    ngOnInit(): void {
        // Initialize Autocomplete Filters
        this.filteredTreatments = this.treatmentControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterOptions(value, this.treatmentsList))
        );

        this.filteredLocations = this.locationControl.valueChanges.pipe(
            startWith(''),
            map(value => this.filterOptions(value, this.locationsList))
        );
    }

    // Filter Options Method
    private filterOptions(value: any, options: string[]): string[] {
        const filterValue = value.toLowerCase();
        return options.filter(option => option.toLowerCase().includes(filterValue));
    }

    // Event Handlers
    onOptionSelected(event: any) {
        console.log('Treatment selected:', event.option.value);
    }

    onLocationSelected(event: any) {
        console.log('Location selected:', event.option.value);
    }

    onTimeSelected(event: any) {
        console.log('Time selected:', event.value);
    }

    getAllSalons() {
        let salons = [
            {
                id: 1,
                name: null,
                address: "hulimavu",
                nearby: "sai ram hospital",
                imageUrls: "https://images.app.goo.gl/cD89ehzh5vWUSseg7"
            },
            {
                id: 2,
                name: null,
                address: "jp nagar",
                nearby: "style up",
                imageUrls: "https://images.app.goo.gl/cHsk9x8RXHTdFSNG8"
            },
            {
                id: 3,
                name: null,
                address: "hulimavu",
                nearby: "muthoor finance",
                imageUrls: "https://images.app.goo.gl/g5N81BH3URRkuGPP7"
            },
            {
                id: 4,
                name: null,
                address: "DLF",
                nearby: "venkateshwara",
                imageUrls: "https://images.app.goo.gl/NwakhCNwhJTkHTyd7"
            }
        ];

        this.vonService.getAllSalons().subscribe(
            data => {
                console.log('Salon data:', data);
            },
            err => {
                console.log('Error fetching salons:', err);
            }
        );
    }

    onSearch() {
        const selectedTreatment = this.treatmentControl.value;
        const selectedLocation = this.locationControl.value;
        const selectedDate = this.form.get('date')?.value;
        const selectedTime = this.form.get('time')?.value;

        console.log({
            treatment: selectedTreatment,
            location: selectedLocation,
            date: selectedDate,
            time: selectedTime
        });

        this.getAllSalons();
    }


    redirectToDetails(id: any) {
        this.router.navigateByUrl("/salon-details");
    }

    salons = [

        {
        name: 'V-cut Salon',
        image: 'https://images.fresha.com/locations/location-profile-images/437841/1995450/2d8a39d4-2c1b-4109-a46a-e39681dfbdb1-Blown-Indiranagar-IN-Karnataka-Bangalore-Indiranagar-Fresha.jpg?class=venue-gallery-large',
        address: 'Hulimavu, Bangalore',
        deals: 'Beauty Salon',
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
        image: 'https://images.fresha.com/locations/location-profile-images/437841/1995450/2d8a39d4-2c1b-4109-a46a-e39681dfbdb1-Blown-Indiranagar-IN-Karnataka-Bangalore-Indiranagar-Fresha.jpg?class=venue-gallery-large',
        address: 'Hulimavu, Bangalore',
        deals: 'Beauty Salon',
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
}













