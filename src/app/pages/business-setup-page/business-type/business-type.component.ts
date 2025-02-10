import { Component, Input } from '@angular/core';

@Component({
  selector: 'business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.scss']
})
export class BusinessTypeComponent {
  @Input() multiSelect: boolean = false; // Single or multi-selection

  categories = [
    {name: 'Hair Salon', icon: 'bi bi-scissors'},
    {name: 'Nail Salon', icon: 'bi bi-brush'},
    {name: 'Barbershop', icon: 'bi bi-person'},
    {name: 'Beauty Salon', icon: 'bi bi-heart'},
    {name: 'Aesthetics', icon: 'bi bi-magic'},
    {name: 'Spa', icon: 'bi bi-droplet'},
    {name: 'Massage', icon: 'bi bi-hand-thumbs-up'},
    {name: 'Waxing Salon', icon: 'bi bi-lightning'},
    {name: 'Tanning Studio', icon: 'bi bi-sun'},
    {name: 'Eyebrows & Lashes', icon: 'bi bi-eye'},
    {name: 'Tattoo & Piercing', icon: 'bi bi-heart-pulse'},
    {name: 'Therapy Center', icon: 'bi bi-plus-circle'},
    {name: 'Weight Loss', icon: 'bi bi-speedometer'},
    {name: 'Personal Trainer', icon: 'bi bi-person-check'},
    {name: 'Gym & Fitness', icon: 'bi bi-bicycle'},
    {name: 'Other', icon: 'bi bi-plus'}
  ];

  selectedCategories: any[] = [];
  otherCategory: string = '';

  selectCategory(category: any) {
    if (this.multiSelect) {
      // Multi-select: Allow up to 5 selections
      const index = this.selectedCategories.indexOf(category);
      if (index === -1) {
        if (this.selectedCategories.length < 5) {
          this.selectedCategories.push(category);
        }
      } else {
        this.selectedCategories.splice(index, 1);
      }
    } else {
      // Single-select
      this.selectedCategories = [category];
    }
  }

  updateOtherCategory(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.otherCategory = inputElement.value;
  }

  isOtherSelected(): boolean {
    return this.selectedCategories.some(c => c.name === 'Other');
  }
}