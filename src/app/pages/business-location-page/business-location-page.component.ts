import {Component, HostListener} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-business-location-page',
  templateUrl: './business-location-page.component.html',
  styleUrls: ['./business-location-page.component.scss']
})
export class BusinessLocationPageComponent {
  showModal = false;
  dropdowns = {
    optionsDropdown: false,
    actionsDropdown: false
  };

  constructor(private router: Router) {}

  details = [
    { name: 'Business details', active: false },
    { name: 'Locations', active: false },
    { name: 'Client sources', active: false }
  ];

  settings = [
    { name: 'Service menu', active: false },
    { name: 'Product list', active: false },
    { name: 'Memberships', active: false },
    { name: 'Client list', active: false }
  ];

  selectDetails(item: any) {
    this.details.forEach(detail => detail.active = false);
    this.settings.forEach(setting => setting.active = false);
    item.active = true;
  }

  copyShareLink(event: Event) {
    event.preventDefault(); // Prevents page reload
    const shareLink = "https://yourwebsite.com/share"; // Replace with actual link
    navigator.clipboard.writeText(shareLink).then(() => {
      alert("Share link copied!");
    });
  }

  navigateToBusinessSetup() {
    this.router.navigate(['./business-setup']); // Change the route path accordingly
  }

  toggleDropdown(event: Event, dropdown: keyof typeof this.dropdowns) {
    event.stopPropagation();
    // Close other dropdowns
    Object.keys(this.dropdowns).forEach(key => {
      if (key !== dropdown) {
        this.dropdowns[key as keyof typeof this.dropdowns] = false;
      }
    });
    // Toggle the clicked dropdown
    this.dropdowns[dropdown] = !this.dropdowns[dropdown];
  }

  viewLocation(event: Event) {
    event.preventDefault();
    alert('View Location Clicked!'); // Replace with actual view logic
  }

  deleteLocation(event: Event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete this location?')) {
      alert('Location Deleted!'); // Replace with actual delete logic
    }
  }

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  closeDropdown() {
    this.dropdowns.optionsDropdown = false;
    this.dropdowns.actionsDropdown = false;
  }

  /*** Modal Functions ***/
  openModal(event: Event) {
    event.preventDefault();
    this.showModal = true;
    this.dropdowns.optionsDropdown = false; // Close dropdown when opening modal
  }

  closeModal() {
    this.showModal = false;
  }
}
