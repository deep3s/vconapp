import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import {Router} from "@angular/router";

// @ts-ignore
import {VconService} from "src/app/services/vcon/vcon.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
  // Form Controls
  treatmentControl = new FormControl('');
  locationControl = new FormControl('');
  form = new FormGroup({
    date: new FormControl(),
    time: new FormControl()
  });

  // Data Lists
  treatmentsList: string[] = ['Haircut', 'Facial', 'Manicure', 'Pedicure', 'Waxing'];
  locationsList: string[] = ['Bengaluru', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai'];
  timeList: string[] = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM'
  ];

  // Filtered Options
  filteredTreatments!: Observable<string[]>;
  filteredLocations!: Observable<string[]>;

  // Carousel Data
  cards = [

        {
          id: 1,
          name: null,
          address: "hulimavu",
          nearby: "sai ram hospital",
          imageUrls: "https://images.app.goo.gl/cD89ehzh5vWUSseg7"
        },
            {
              id: 2,
              name: null,
              address: "jp nagar",
              nearby: "style up",
              imageUrls: "https://images.app.goo.gl/cHsk9x8RXHTdFSNG8"
            },
            {
              id: 3,
              name: null,
              address: "hulimavu",
              nearby: "muthoor finance",
              imageUrls: "https://images.app.goo.gl/g5N81BH3URRkuGPP7"
            },
            {
              id: 4,
              name: null,
              address: "DLF",
              nearby: "venkateshwara",
              imageUrls: "https://images.app.goo.gl/NwakhCNwhJTkHTyd7"
            }
        ];

  constructor(public vonService: VconService, public router: Router) {
  }

  ngOnInit(): void {
    // Initialize Autocomplete Filters
    this.filteredTreatments = this.treatmentControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterOptions(value, this.treatmentsList))
    );

    this.filteredLocations = this.locationControl.valueChanges.pipe(
        startWith(''),
        map(value => this.filterOptions(value, this.locationsList))
    );
  }

  // Filter Options Method
  private filterOptions(value: any, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  // Event Handlers
  onOptionSelected(event: any) {
    console.log('Treatment selected:', event.option.value);
  }

  onLocationSelected(event: any) {
    console.log('Location selected:', event.option.value);
  }

  onTimeSelected(event: any) {
    console.log('Time selected:', event.value);
  }

  getAllSalons() {
    let salons = [
      {
        id: 1,
        name: null,
        address: "hulimavu",
        nearby: "sai ram hospital",
        imageUrls: "https://images.app.goo.gl/cD89ehzh5vWUSseg7"
      },
      {
        id: 2,
        name: null,
        address: "jp nagar",
        nearby: "style up",
        imageUrls: "https://images.app.goo.gl/cHsk9x8RXHTdFSNG8"
      },
      {
        id: 3,
        name: null,
        address: "hulimavu",
        nearby: "muthoor finance",
        imageUrls: "https://images.app.goo.gl/g5N81BH3URRkuGPP7"
      },
      {
        id: 4,
        name: null,
        address: "DLF",
        nearby: "venkateshwara",
        imageUrls: "https://images.app.goo.gl/NwakhCNwhJTkHTyd7"
      }
    ];

    this.vonService.getAllSalons().subscribe(
        data => {
          console.log('Salon data:', data);
        },
        err => {
          console.log('Error fetching salons:', err);
        }
    );
  }

  onSearch() {
    const selectedTreatment = this.treatmentControl.value;
    const selectedLocation = this.locationControl.value;
    const selectedDate = this.form.get('date')?.value;
    const selectedTime = this.form.get('time')?.value;

    console.log({
      treatment: selectedTreatment,
      location: selectedLocation,
      date: selectedDate,
      time: selectedTime
    });

    this.getAllSalons();
  }


  redirectToDetails(id: any) {
    this.router.navigateByUrl("/salon-details");
  }

}













