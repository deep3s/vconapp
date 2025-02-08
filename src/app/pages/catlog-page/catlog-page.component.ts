import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'catlog-page',
  templateUrl: './catlog-page.component.html',
  styleUrls: ['./catlog-page.component.scss']
})
export class CatlogPageComponent implements OnInit {
  searchTerm: string = '';

  categories: any = [
    { name: 'All categories', count: 6,categorieId:1,},
    {
      name: 'Hair & styling', count: 4, categorieId: 1, active: true,
      services: [
        {name: 'Haircut', duration: '45min', price: 40},
        {name: 'Hair Color', duration: '1h 15min', price: 57},
        {name: 'Blow Dry', duration: '35min', price: 35},
        {name: 'Balayage', duration: '2h 30min', price: 150}
      ]
    },
    { name: 'Nails', count: 1 ,categorieId:1,
      services: [
        {name: 'manicure', duration: '45min', price: 100},
      ]
    },
    { name: 'Eyebrows & eyelashes', count: 1,categorieId:1 ,
      services: [
        {name: 'classic fill', duration: '45min', price: 40},
      ]
    }

  ];
  selectedCategory: any = this.categories[1];

  services = [
    { name: 'Haircut', duration: '45min', price: 40 },
    { name: 'Hair Color', duration: '1h 15min', price: 57 },
    { name: 'Blow Dry', duration: '35min', price: 35 },
    { name: 'Balayage', duration: '2h 30min', price: 150 }
  ];



  selectCategory(category: any ){
    this.categories = this.categories.map(ct=> {
      ct.active = false;
      return ct;
    })

    category.active = true;
    this.selectedCategory = category;
  }

  ngOnInit(): void {
    let allServices:any = [];
    this.categories.forEach((category, index) => {
      if(index !==0){
        allServices = [...allServices, ...category.services || []];
      }
    })

    this.categories[0].services = allServices;
  }
}
