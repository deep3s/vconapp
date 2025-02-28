import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'business-type',
  templateUrl: './business-type.component.html',
  styleUrls: ['./business-type.component.scss']
})

export class BusinessTypeComponent implements OnInit {
  @Input() multiSelect: boolean = false;
  @Input() locationInfo: any;
  @Input() mainBusinessType: any = {};
  @Output() businessTypesSelected = new EventEmitter<any>(); // Emit selected categories

  categories = [
    {typeId: '1', name: 'Hair Salon', icon: 'bi bi-scissors'},
    {typeId: '2', name: 'Nail Salon', icon: 'bi bi-brush'},
    {typeId: '3', name: 'Barbershop', icon: 'bi bi-person'},
    {typeId: '4', name: 'Beauty Salon', icon: 'bi bi-heart'},
    {typeId: '5', name: 'Aesthetics', icon: 'bi bi-magic'},
    {typeId: '6', name: 'Spa', icon: 'bi bi-droplet'},
    {typeId: '7', name: 'Massage', icon: 'bi bi-hand-thumbs-up'},
    {typeId: '8', name: 'Waxing Salon', icon: 'bi bi-lightning'},
    {typeId: '9', name: 'Tanning Studio', icon: 'bi bi-sun'},
    {typeId: '10',name: 'Eyebrows & Lashes', icon: 'bi bi-eye'},
    {typeId: '11',name: 'Tattoo & Piercing', icon: 'bi bi-heart-pulse'},
    {typeId: '12',name: 'Therapy Center', icon: 'bi bi-plus-circle'},
    {typeId: '13',name: 'Weight Loss', icon: 'bi bi-speedometer'},
    {typeId: '14',name: 'Personal Trainer', icon: 'bi bi-person-check'},
    {typeId: '15',name: 'Gym & Fitness', icon: 'bi bi-bicycle'},
    {typeId: '16',name: 'Other', icon: 'bi bi-plus'}
  ];

  selectedCategories: any[] = [];
  otherCategory: string = '';
  isEditing: boolean = false; // Controls Edit Mode



  ngOnInit(): void {
    if (this.locationInfo?.businessTypes) {
      this.selectedCategories = [...this.locationInfo.businessTypes];
    }
  }
  // selectCategory(category: any) {
  //   if (this.multiSelect) {
  //     const index = this.selectedCategories.findIndex(c => c.typeId === category.typeId);
  //     if (index === -1) {
  //       if (this.selectedCategories.length < 5) {
  //         this.selectedCategories.push(category);
  //       }
  //     } else {
  //       this.selectedCategories.splice(index, 1);
  //     }
  //   } else {
  //     this.selectedCategories = [category];
  //   }
  //   this.emitSelection();
  // }

  
  selectCategory(category: any) {
    if (this.multiSelect) {
      const index = this.selectedCategories.indexOf(category);
      if (index === -1) {
        if (this.selectedCategories.length < 5) {
          this.selectedCategories.push(category);
          console.log(this.selectedCategories);
        }
      } else {
        this.selectedCategories.splice(index, 1);
        console.log(this.selectedCategories);

      }
    } else {
      this.selectedCategories = [category];
      console.log(this.selectedCategories);
    }
    this.emitSelection();
  }

  updateOtherCategory(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.otherCategory = inputElement.value;
    this.emitSelection();
  }

  isOtherSelected(): boolean {
    return this.selectedCategories.some(c => c.name === 'Other');
  }

  // Emit selected categories to parent
  emitSelection() {
    const selectedData = this.isOtherSelected()
        ? [...this.selectedCategories, {name: 'Other', value: this.otherCategory}]
        : this.selectedCategories;
    this.businessTypesSelected.emit(selectedData);
  }

  selectCategories(category: any): boolean {
    return this.selectedCategories.some((selectedCategory: any) => selectedCategory.typeId === category.typeId);
  }
}

