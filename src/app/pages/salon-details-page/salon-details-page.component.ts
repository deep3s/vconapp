import { Component } from '@angular/core';
import { Router } from '@angular/router';

// Define the Day type
interface Day {
  name: string;
  hours: string;
}

@Component({
  selector: 'app-salon-details-page',
  templateUrl: './salon-details-page.component.html',
  styleUrls: ['./salon-details-page.component.scss'],
})
export class SalonDetailsPageComponent {
  isFavorite = false; // State for favorite heart button
  showAll = false; // Controls "Show All" services list visibility
  isOpen = true; // State for salon's open/closed status (default to 'open')

  salonDetails={
    name: 'Vcut',
    reviews: [
      { title: 'Great Service', rating: 5 },
      { title: 'Decent Service', rating: 3 }
    ],
    openUntil: '12:00 AM',
    services: [
      {
        name: 'Massage',
        types: [
          {
            name: 'Swedish Massage',
            duration: '60 minutes',
            price: 50
          },
          {
            name: 'Deep Tissue Massage',
            duration: '90 minutes',
            price: 80
          }
        ]
      }
    ],
    team: [
      { name: 'Shilpa', speciality: 'Massage Therapist' },
      { name: 'Seema', speciality: 'Massage Spa Therapist' }
    ],
    about: 'we offer a best spa and massage in the city!',
    additionalInfo: 'Instant Confirmation available , book now!',
    timings: [
      { day:"Monday" ,from: '10:00 am', to: '12:00 am' },
      { day:"Tuesday" ,from: '10:00 am', to: '12:00 am' },
      { day:"Wednesday" ,from: '10:00 am', to: '12:00 am' },
      { day:"Thursday" ,from: '10:00 am', to: '12:00 am' },
      { day:"Friday" ,from: '10:00 am', to: '12:00 am' },
      { day:"Saturday" ,from: '10:00 am', to: '12:00 am' },
      { day:"Saturday" ,from: '10:00 am', to: '12:00 am' }
    ],
    venuesNearBy: [
      {
        image: 'https://www.w3schools.com/w3images/fjords.jpg',
        name: 'Vcut unisex Salon',
        reviews: [
          {
            rating: 4,
            title: 'relaxing atmosphere and good service.'
          },
          {
            rating: 5,
            title: 'Excellent service,highly recommended!'
          }
        ],
        locations: ['Hulimavu', 'Bangalore']
      },
      {
        image: 'image_url_2.jpg',
        name: "Vcut Men's Salon",
        reviews: [
          { rating: 4, title: 'Good experience,but could be better.' },
          {
            rating: 3,
            title: 'the service was okay, the place needs mainrenance.'
          }
        ],
        locations: ['Dlf', 'Bangalore']
      }
    ]
  };
  // Sample services to be displayed in the UI
  services = [
    { id: 1, name: 'Female to Male Massage', duration: '30 mins', price: '₹2,010', discount: '33%' },
    { id: 2, name: 'Swedish Massage', duration: '30 mins', price: '₹1,500', discount: '25%' },
    { id: 3, name: 'Deep Tissue Massage', duration: '30 mins', price: '₹1,500', discount: '25%' },
    { id: 4, name: 'Therapeutic Massage', duration: '30 mins', price: '₹1,500', discount: '25%' },
    { id: 5, name: 'Reflexology', duration: '30 mins', price: '₹1,000', discount: '50%' },
    { id: 6, name: 'Aromatherapy Massage', duration: '45 mins', price: '₹2,200', discount: '20%' },
    { id: 7, name: 'Hot Stone Massage', duration: '60 mins', price: '₹2,800', discount: '15%' },
    { id: 8, name: 'Balinese Massage', duration: '60 mins', price: '₹2,500', discount: '18%' },
    { id: 9, name: 'Sports Massage', duration: '45 mins', price: '₹2,000', discount: '30%' },
    { id: 10, name: 'Shiatsu Massage', duration: '60 mins', price: '₹3,000', discount: '10%' },
  ];

  // Initialize openingDays with correct typing
  openingDays: Day[] = [
    { name: 'Monday', hours: '9:00 AM - 7:00 PM' },
    { name: 'Tuesday', hours: '9:00 AM - 7:00 PM' },
    { name: 'Wednesday', hours: '9:00 AM - 7:00 PM' },
    { name: 'Thursday', hours: '9:00 AM - 7:00 PM' },
    { name: 'Friday', hours: '9:00 AM - 7:00 PM' },
    { name: 'Saturday', hours: '10:00 AM - 6:00 PM' },
    { name: 'Sunday', hours: 'Closed' },
  ];
  locations = [
    { name: 'Branch 1', address: '123 Main Street, City', image: 'assets/location1.jpg' },
    { name: 'Branch 2', address: '456 Elm Street, City', image: 'assets/location2.jpg' },
    { name: 'Branch 3', address: '789 Oak Avenue, City', image: 'assets/location3.jpg' },
    { name: 'Branch 4', address: '101 Pine Road, City', image: 'assets/location4.jpg' },
    { name: 'Branch 5', address: '202 Maple Lane, City', image: 'assets/location5.jpg' },
    { name: 'Branch 6', address: '303 Cedar Road, City', image: 'assets/location6.jpg' },
    { name: 'Branch 7', address: '404 Birch Lane, City', image: 'assets/location7.jpg' },
    { name: 'Branch 8', address: '505 Willow Avenue, City', image: 'assets/location8.jpg' },
    { name: 'Branch 9', address: '606 Redwood Drive, City', image: 'assets/location9.jpg' },
    { name: 'Branch 10', address: '707 Spruce Boulevard, City', image: 'assets/location10.jpg' }
  ];

  currentIndex = 0; // Keeps track of the starting index for visible locations
  visibleLocations = this.locations.slice(0, 5); // Initial visible locations

  constructor(private router: Router) {}

  // Toggle the favorite (heart) state
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    console.log('Favorite toggled:', this.isFavorite);
  }

  // Navigate back to the previous page
  goBack() {
    this.router.navigate(['previous-page']); // Replace with actual route
  }

  // Navigate to home or close the page/modal
  close(): void {
    this.router.navigate(['home']); // Replace with actual home route
  }

  // Handle click on a service card
  onServiceClick(service: any) {
    console.log('Service clicked:', service);
    this.router.navigate(['service-details'], { queryParams: { id: service.id } });
  }

  // Toggle "Show All" services list
  toggleShowAll() {
    this.showAll = !this.showAll;
    console.log('Show all services:', this.showAll);
  }

  bookNow() {
    console.log('Booking initiated!');
    this.router.navigate(['/booking']);
  }

  makeCall() {
    window.location.href = 'tel:+919876543210';  // Replace with actual number
  }

  moveLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleLocations();
    }
  }

  private updateVisibleLocations() {
    this.visibleLocations = this.locations.slice(this.currentIndex, this.currentIndex + 5);
  }

  moveRight() {
    if (this.currentIndex + 5 < this.locations.length) {
      this.currentIndex++;
      this.updateVisibleLocations();
    }
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }

}
