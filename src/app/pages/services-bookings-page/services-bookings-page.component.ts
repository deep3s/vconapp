import {Component, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-services-bookings-page',
    templateUrl: './services-bookings-page.component.html',
    styleUrls: ['./services-bookings-page.component.scss'],

})
export class ServicesBookingsPageComponent {
    @ViewChild('categoryWrapper') categoryWrapper!: ElementRef;
    @Output() onServiceSelect = new EventEmitter<any>(); // Output event
    cartServices: any = [];
    categories = [
        'Featured',
        'Hair Chemical Treatment',
        'Hair do',
        'Short hair',
        'Packages For Women',
        'Packages For Men',
        'Hair color',
        'hair-spa',
        'waxing',
        'threading'
    ];
    // All services as before...
    services = [
        {name: 'Eyebrows', category: 'Featured', duration: '15 mins', price: 60, discount: '25%'},
        {name: 'Hair Cut(Men)', category: 'Featured', duration: '15 mins', price: 60, discount: '25%'},
        {name: 'Forehead / Chin', category: 'Featured', duration: '15 mins', price: 60, discount: '25%'},
        {name: 'Lower Lip', category: 'Featured', duration: '15 mins', price: 60, discount: '25%'},
        {name: 'Upper Lip', category: 'Featured', duration: '15 mins', price: 60, discount: '25%'},

        {
            name: 'Hair Spa- Salon Services Absolut Repair Molecular',
            category: 'Hair Chemical Treatment',
            duration: '10 mins',
            price: 40,
            discount: '25%'
        },
        {
            name: 'Keratin/MK Botox Service',
            category: 'Hair Chemical Treatment',
            duration: '10 mins',
            price: 40,
            discount: '25%'
        },
        {
            name: 'Root Touch Up With Ammonia',
            category: 'Hair Chemical Treatment',
            duration: '10 mins',
            price: 40,
            discount: '25%'
        },
        {
            name: 'Root Touch Up With Ammonia free',
            category: 'Hair Chemical Treatment',
            duration: '10 mins',
            price: 40,
            discount: '25%'
        },
        {
            name: 'Root Touch Up With Ammonia long re-growth',
            category: 'Hair Chemical Treatment',
            duration: '10 mins',
            price: 40,
            discount: '25%'
        },

        {name: 'Basic hair do', category: 'Hair do', duration: '25-30 mins', price: 310, discount: '25%'},

        {name: 'Short hair 5899', category: 'Short hair', duration: '25-30 mins', price: 310, discount: '25%'},
        {
            name: 'Cysteine / Keratin WASHBLOWDRY',
            category: 'Short hair',
            duration: '25-30 mins',
            price: 310,
            discount: '25%'
        },

        {name: 'Package For Women (1)', category: 'Packages For Women', duration: '5 mins', price: 50, discount: '25%'},
        {name: 'Package For Women (2)', category: 'Packages For Women', duration: '5 mins', price: 50, discount: '25%'},
        {name: 'Package For Women (3)', category: 'Packages For Women', duration: '5 mins', price: 50, discount: '25%'},
        {name: 'Package For Women (4)', category: 'Packages For Women', duration: '5 mins', price: 50, discount: '25%'},
        {name: 'Package For Women (5)', category: 'Packages For Women', duration: '5 mins', price: 50, discount: '25%'},
        {
            name: 'Women Premium Grooming Package',
            category: 'Packages For Women',
            duration: '5 mins',
            price: 50,
            discount: '25%'
        },
        {
            name: 'Hair Cut(Men) + Clean Up',
            category: 'Packages For Men',
            duration: '25-30 mins',
            price: 300,
            discount: '25%'
        },

        {
            name: 'Package For Men (1)',
            category: 'Packages For Men',
            duration: '25-30 mins',
            price: 300,
            discount: '25%'
        },
        {
            name: 'Package For Men (2)',
            category: 'Packages For Men',
            duration: '25-30 mins',
            price: 300,
            discount: '25%'
        },
        {
            name: 'Package For Men (3)',
            category: 'Packages For Men',
            duration: '25-30 mins',
            price: 300,
            discount: '25%'
        },
        {
            name: 'Package For Men (4)',
            category: 'Packages For Men',
            duration: '25-30 mins',
            price: 300,
            discount: '25%'
        },
        {
            name: 'Package For Men (5)',
            category: 'Packages For Men',
            duration: '25-30 mins',
            price: 300,
            discount: '25%'
        },

        {name: 'Short Hair Cut', category: 'Hair color', duration: '20 mins', price: 5899, discount: '25%'},
        {name: 'Short Hair Cut', category: 'Hair color', duration: '20 mins', price: 5899, discount: '25%'},

        {name: 'Short Hair Cut', category: 'hair-spa', duration: '20 mins', price: 5899, discount: '25%'},
        {name: 'Short Hair Cut', category: 'waxing', duration: '20 mins', price: 5899, discount: '25%'},
        {name: 'Short Hair Cut', category: 'threading', duration: '20 mins', price: 5899, discount: '25%'},
    ];
    salonDetails = {
        name: 'V-Cut Salon',
        openUntil: '12:00 AM',
        ssa: 'akshyanagar',
        sa: 'Akshayanagar, Bengaluru, Karnataka 560068',

        reviews: [
            {title: 'Great Service', rating: 5},
            {title: 'Decent Service', rating: 3}
        ],
        images: [
            'https://www.w3schools.com/w3images/fjords.jpg',
            'https://media.istockphoto.com/id/1856117770/photo/modern-beauty-salon.jpg?s=612x612&w=0&k=20&c=dVZtsePk2pgbqDXwVkMm-yIw5imnZ2rnkAruR7zf8EA=',
        ],
        services: [
            {
                name: 'Massage',
                types: [
                    {id: 1, name: 'Female to Male Massage', duration: '30 mins', price: '₹2,010', discount: '33%'},
                    {id: 2, name: 'Swedish Massage', duration: '30 mins', price: '₹1,500', discount: '25%'},
                    {id: 3, name: 'Deep Tissue Massage', duration: '30 mins', price: '₹1,500', discount: '25%'},
                    {id: 4, name: 'Therapeutic Massage', duration: '30 mins', price: '₹1,500', discount: '25%'},
                    {id: 5, name: 'Reflexology', duration: '30 mins', price: '₹1,000', discount: '50%'},
                    {id: 6, name: 'Aromatherapy Massage', duration: '45 mins', price: '₹2,200', discount: '20%'},
                ],
            }
        ],

        team: [
            {name: 'Shilpa', speciality: 'Massage Therapist'},
            {name: 'Seema', speciality: 'Massage Spa Therapist'}
        ],

        about: 'we offer a best spa and massage in the city!',
        additionalInfo: 'Instant Confirmation available , book now!',
        timings: [
            {day: "Monday", from: '10:00 am', to: '12:00 am'},
            {day: "Tuesday", from: '10:00 am', to: '12:00 am'},
            {day: "Wednesday", from: '10:00 am', to: '12:00 am'},
            {day: "Thursday", from: '10:00 am', to: '12:00 am'},
            {day: "Friday", from: '10:00 am', to: '12:00 am'},
            {day: "Saturday", from: '10:00 am', to: '12:00 am'},
            {day: "Saturday", from: '10:00 am', to: '12:00 am'}
        ],
        // venuesNearBy: [
        //     {
        //         image: 'https://www.w3schools.com/w3images/fjords.jpg',
        //         name: 'Vcut unisex Salon',
        //         reviews: [
        //             {
        //                 rating: 4,
        //                 title: 'relaxing atmosphere and good service.'
        //             },
        //             {
        //                 rating: 5,
        //                 title: 'Excellent service,highly recommended!'
        //             }
        //         ],
        //         locations: ['Hulimavu', 'Bangalore']
        //     },
        //     {
        //         image: 'image_url_2.jpg',
        //         name: "Vcut Men's Salon",
        //         reviews: [
        //             {rating: 4, title: 'Good experience,but could be better.'},
        //             {
        //                 rating: 3,
        //                 title: 'the service was okay, the place needs mainrenance.'
        //             }
        //         ],
        //         locations: ['Dlf', 'Bangalore']
        //     }
        // ]
    }
    // Selected category
    selectedCategory = 'Featured'; // Default to 'Featured' category
    // Cart functionality
    cart: any[] = [];

    // Filtered services
    get filteredServices() {
        return this.services.filter(service => service.category === this.selectedCategory);
    }

    // Move category buttons to the left
    moveCategoryLeft() {
        const wrapper = this.categoryWrapper.nativeElement;
        wrapper.scrollLeft -= 180;  // Adjust this value based on button width and container size
    }

// Move category buttons to the right
    moveCategoryRight() {
        const wrapper = this.categoryWrapper.nativeElement;
        wrapper.scrollLeft += 180;  // Adjust this value based on button width and container size
    }

    toggleService(service: any) {
        if (this.isSelected(service)) {
            this.cart = this.cart.filter(item => item !== service);
        } else {
            this.cart.push(service);
        }
    }

    isSelected(service: any) {
        return this.cart.includes(service);
    }

    getTotal() {
        const total = this.cart.reduce((total, service) => total + service.price, 0);
        const discount = total * 0.25; // 25% discount
        return total - discount;
    }

    // Select Category
    selectCategory(category: string) {
        this.selectedCategory = category;
    }

    // Function to emit event when service is added
    addService(service: any) {
        if(!this.cartServices.find(cs => cs.name === service.name)) {
            this.cartServices.push(service);
        }

    }
    removeService(service: any) {
        this.cartServices = this.cartServices.filter(cs=> cs.name !== service.name);
    }
}
