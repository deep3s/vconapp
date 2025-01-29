import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salon-details-page',
  templateUrl: './salon-details-page.component.html',
  styleUrls: ['./salon-details-page.component.scss'],
})
export class SalonDetailsPageComponent {
  isFavorite = false; // This variable holds the state of the heart button\

  // Sample services to be displayed in the UI
  services = [
    {
      id: 1,
      name: 'Female to Male Massage',
      duration: '30 mins',
      price: '₹2,010',
      discount: '33%',
    },
    {
      id: 2,
      name: 'Swedish Massage',
      duration: '30 mins',
      price: '₹1,500',
      discount: '25%',
    },
    {
      id: 3,
      name: 'Deep Tissue Massage',
      duration: '30 mins',
      price: '₹1,500',
      discount: '25%',
    },
    {
      id: 4,
      name: 'Therapeutic Massage',
      duration: '30 mins',
      price: '₹1,500',
      discount: '25%',
    },
    {
      id: 5,
      name: 'Reflexology',
      duration: '30 mins',
      price: '₹1,000',
      discount: '50%',
    },
    {
      id: 6,
      name: 'Aromatherapy Massage',
      duration: '45 mins',
      price: '₹2,200',
      discount: '20%',
    },
    {
      id: 7,
      name: 'Hot Stone Massage',
      duration: '60 mins',
      price: '₹2,800',
      discount: '15%',
    },
    {
      id: 8,
      name: 'Balinese Massage',
      duration: '60 mins',
      price: '₹2,500',
      discount: '18%',
    },
    {
      id: 9,
      name: 'Sports Massage',
      duration: '45 mins',
      price: '₹2,000',
      discount: '30%',
    },
    {
      id: 10,
      name: 'Shiatsu Massage',
      duration: '60 mins',
      price: '₹3,000',
      discount: '10%',
    },
  ];

  showAll: boolean = false;  // Declare the showAll property at the class level

  constructor(private router: Router) {}

  // Toggle the favorite state
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    console.log('showAll is now:', this.showAll);
  }

  // Navigate back to the previous page
  goBack() {
    this.router.navigate(['previous-page']); // Replace with actual previous page route
  }

  // Navigate to home or close the page/modal
  close(): void {
    this.router.navigate(['home']); // Replace with actual home route or close functionality
  }

  // Handle click on a service card
  onServiceClick(service: any) {
    console.log('Service clicked:', service);
    this.router.navigate(['service-details'], { queryParams: { id: service.id } });
  }

  // Toggle the "Show All" functionality
  toggleShowAll() {
    this.showAll = !this.showAll;  // Directly update the class property
    console.log('showAll is now:', this.showAll);
  }
}
//
//   constructor(private router: Router) {}
//   // Toggle the favorite state
//   toggleFavorite() {
//     this.isFavorite = !this.isFavorite;
//     console.log('showAll is now:', this.showAll);
//   }
//
//   // Navigate back to the previous page
//   goBack() {
//     this.router.navigate(['previous-page']); // Replace with actual previous page route
//   }
//
//   // Navigate to home or close the page/modal
//   close(): void {
//     this.router.navigate(['home']); // Replace with actual home route or close functionality
//   }
//
//   // Handle click on a service card
//   showAll: boolean;
//   onServiceClick(service: any) {
//     console.log('Service clicked:', service);
//
//     // Example: Navigate to a service details page with query parameters
//     this.router.navigate(['service-details'], { queryParams: { id: service.id } });
//   }
//
//   toggleShowAll() {
//     let showAll = !this.showAll;  // Don't declare a local variable with the same name
//     console.log(showAll);
//     // Instead, update the class property directly:
//     this.showAll = !this.showAll;
//   }
//
//   protected readonly console = module
//
