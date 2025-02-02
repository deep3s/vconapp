import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent {
  activeTab: string = 'Featured'; // Default active tab
  tabs: string[] = [
    'Haircut',
    'pedicure',
    'Manicure',
    'waxing',
    'HairSpa',
    'Facials',
    'Spa/Massage',
    'Waxing/Threading',
    'Packages for Women',
    'Package for Men',
    'Hair Cuts/Styling',
    'Hair Color Treatment',
    'Organic Services',
    'Retail Products'
  ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  scrollTabs(direction: string): void {
    const tabList = document.querySelector('.tab-list') as HTMLElement;
    const scrollAmount = direction === 'left' ? -100 : 100;
    tabList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}
