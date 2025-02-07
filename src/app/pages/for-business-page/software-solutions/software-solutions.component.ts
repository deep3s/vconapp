import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'software-solutions',
  templateUrl: './software-solutions.component.html',
  styleUrls: ['./software-solutions.component.scss']
})
export class SoftwareSolutionsComponent {
  solutions = [
    {
      icon: 'https://www.fresha.com/assets/_next/static/images/solution-appointments-management-5baf05b8691db04f7165b7c0cc5850d6.svg',
      title: 'Appointment scheduling',
      description: 'A sleek and user-friendly salon software compatible with all devices for seamless appointments scheduling and management.'
    },
    {
      icon: 'https://www.fresha.com/assets/_next/static/images/solution-appointments-management-5baf05b8691db04f7165b7c0cc5850d6.svg',
      title: 'Payment processing',
      description: 'Securely process client payments via pay by link, saved card, and Fresha card terminals for a seamless checkout experience.'
    },
    {
      icon: 'https://www.fresha.com/assets/_next/static/images/solution-appointments-management-5baf05b8691db04f7165b7c0cc5850d6.svg',
      title: 'Point of sale (POS)',
      description: 'All the tools to manage your salon retail operations with barcode scanners, receipt prints, and more.'
    },
    {
      icon: 'https://www.fresha.com/assets/_next/static/images/solution-appointments-management-5baf05b8691db04f7165b7c0cc5850d6.svg',
      title: 'Marketing promotions',
      description: 'The most powerful salon software with marketing features to grow your business and appointment bookings from new clients.'
    },
    {
      icon: 'https://www.fresha.com/assets/_next/static/images/solution-appointments-management-5baf05b8691db04f7165b7c0cc5850d6.svg',
      title: 'Product inventory and online store',
      description: 'Manage your stock and set up your own online store to sell products worldwide.'
    },
    {
      icon: 'https://www.fresha.com/assets/_next/static/images/solution-appointments-management-5baf05b8691db04f7165b7c0cc5850d6.svg',
      title: 'Reporting and analytics',
      description: 'Leverage Fresha\'s performance analytics and reporting tools to gain valuable insights into your salon\'s financials, client trends, and overall business growth.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
