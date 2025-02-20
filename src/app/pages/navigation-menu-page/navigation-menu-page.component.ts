import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation-menu-page',
  templateUrl: './navigation-menu-page.component.html',
  styleUrls: ['./navigation-menu-page.component.scss']
})
export class NavigationMenuPageComponent {
  public isExpanded = false;
  public activeItem: any = null; // Track the active menu item

  menuItems = [
    { name: 'Dashboard', route: '/dashboard', icon: 'bi-house-door' },
    { name: 'Appointments', route: '/appointments', icon: 'bi-calendar' },
    { name: 'Sales', route: '/sales', icon: 'bi-tag' },
    { name: 'Customers', route: '/customers', icon: 'bi-emoji-smile' },
    { name: 'Catalog', route: '/catalog', icon: 'bi-book' },
    { name: 'Staff', route: '/staff', icon: 'bi-person-badge' },
    { name: 'Announcements', route: '/announcements', icon: 'bi-megaphone' },
    { name: 'Users', route: '/users', icon: 'bi-people' },
    { name: 'Reports', route: '/reports', icon: 'bi-bar-chart' },
    { name: 'Settings', route: '/settings', icon: 'bi-gear' }
  ];
  // Function to set the active menu item
  public setActiveItem(item: any) {
    this.activeItem = item; // Set the clicked item as active
  }

  // Toggle sidebar expansion
  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
