import { Component } from '@angular/core';

@Component({
  selector: 'app-business-setup-client-sources-page',
  templateUrl: './business-setup-client-sources-page.component.html',
  styleUrls: ['./business-setup-client-sources-page.component.scss']
})
export class BusinessSetupClientSourcesPageComponent {
  clientSources = [
    { name: 'Walk-In', active: true },
    { name: 'Instagram', active: true },
    { name: 'Imported', active: true },
    { name: 'Google', active: true },
    { name: 'Fresha Marketplace', active: true },
    { name: 'Facebook', active: true },
    { name: 'Book Now Link', active: true }
  ];

  newSource: string = '';
  isActive: boolean = true;

  changeOrder() {
    this.clientSources.reverse();
  }

  addClientSource() {
    if (this.newSource.trim()) {
      this.clientSources.push({ name: this.newSource.trim(), active: this.isActive });
      this.newSource = ''; // Clear input field after adding
      this.isActive = true; // Reset checkbox
    }
  }
}
