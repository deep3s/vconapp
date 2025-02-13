import { Component, HostListener } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'workspace-settings',
  templateUrl: './workspace-settings.component.html',
  styleUrls: ['./workspace-settings.component.scss']
})
export class WorkspaceSettingsComponent {
  activeSection: string = 'settings';
  settings = [
    { title: 'Business setup', icon: 'bi bi-shop', description: 'Customise business details, manage locations, and client referral sources.',link:'' },
    { title: 'Scheduling', icon: 'bi bi-calendar', description: 'Set your availability, manage bookable resources and online booking preferences.',link:'' },
    { title: 'Sales', icon: 'bi bi-tags', description: 'Configure payment methods, taxes, receipts, service charges, and gift cards.',link:'' },
    { title: 'Billing', icon: 'bi bi-receipt', description: 'Manage invoices, text messages, add-ons, and billing.',link:'' },
    { title: 'Team', icon: 'bi bi-people', description: 'Manage permissions, compensation, and time-off.',link:'' },
    { title: 'Forms', icon: 'bi bi-file-earmark-text', description: 'Configure templates for client forms.',link:'' },
    { title: 'Payments', icon: 'bi bi-credit-card', description: 'Configure payment methods, terminals, and your payment policy.',link:'' },
  ];

  onlinePresence = [
    { title: 'Marketplace profile', description: 'Attract new clients with online bookings.',link:'' },
    { title: 'Reserve with Google', description: 'Get online bookings from Google Search and Maps.',link:'' },
    { title: 'Book with Facebook and Instagram', description: 'Get online bookings from your social media pages.',link:'' },
    { title: 'Link builder', description: 'Create shareable booking links and QR codes.',link:'' },
  ];

  marketing = [
    { title: 'Blast marketing', description: 'Share special offers and important updates over email and text message.',link:'' },
    { title: 'Automations', description: 'Engage with your clients and keep them up to date with automations.',link:'' },
    { title: 'Deals', description: 'Reward and retain clients with discount codes, flash sales and promotion offers.',link:'' },
    { title: 'Smart pricing', description: 'Adjust your prices to charge different amounts during more or less busy hours.',link:'' },
    { title: 'Sent messages', description: 'View the list of all email, text and push messages sent to your clients.',link:'' },
    { title: 'Ratings and reviews', description: 'View star ratings and reviews left by clients after their visit.',link:'' },
  ];

  other = [
    { title: 'Add-ons', description: 'Take your business to the next level with Fresha add-ons.',link:'' },
    { title: 'Integrations', description: 'Integrate Fresha with third party applications.',link:'' },
  ];
  constructor(private router:Router) {
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const sections = ['settings', 'onlinePresence', 'marketing', 'other'];
    for (let section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.top < window.innerHeight / 3) {
          this.activeSection = section;
          break;
        }
      }
    }
  }

  scrollToSection(section: string): void {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  navigateTo(link: string) {
    this.router.navigate([link]);
  }
}
