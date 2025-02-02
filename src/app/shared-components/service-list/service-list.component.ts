import {Component, Input} from '@angular/core';

@Component({
  selector: 'service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent {
  @Input() public services: any[];
  @Input() public title: string;
  activeTab: string = 'Featured'; // Default active tab
  showAll = false; // Controls "Show All" services list visibility


  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  scrollTabs(direction: string): void {
    const tabList = document.querySelector('.tab-list') as HTMLElement;
    const scrollAmount = direction === 'left' ? -100 : 100;
    tabList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
  // Toggle "Show All" services list
  toggleShowAll() {
    this.showAll = !this.showAll;
    console.log('Show all services:', this.showAll);
  }
}
