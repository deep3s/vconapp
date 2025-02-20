import { Component } from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'dashboard-page',
  templateUrl: './new-dashboard-page.component.html',
  standalone: true,
  imports: [
    NgClass
  ],
  styleUrls: ['./new-dashboard-page.component.scss']
})
export class NewDashboardPageComponent {
  appointments = [
    { date: '07 ', month:'Feb' , time: 'Fri, 7 Feb 2025 10:00am', status: 'BOOKED', service: 'Manicure', customer: 'Jack Doe', duration: '45min', staff: 'Wendy', price: 25 },
    { date: '07 ', month:'Feb' , time: 'Fri, 7 Feb 2025 10:00am', status: 'STARTED', service: 'Hair Color', customer: 'Jane Doe', duration: '1h 15min', staff: 'Tejaswini', price: 57 },
    { date: '07 ',month:'Feb' , time: 'Fri, 7 Feb 2025 10:00am', status: 'BOOKED', service: 'Haircut', customer: 'John Doe', duration: '45min', staff: 'Tejaswini', price: 40 }
  ];

  topServices = [
    { name: 'Manicure', thisMonth: 1, lastMonth: 0 },
    { name: 'Hair Color', thisMonth: 1, lastMonth: 0 },
    { name: 'Haircut', thisMonth: 1, lastMonth: 0 }
  ];
  nextappointment=[
      { date: '07 ', month:'Feb' , time: 'Fri, 7 Feb 2025 10:00am', status: 'BOOKED', service: 'Manicure', customer: 'Jack Doe', duration: '45min', staff: 'Wendy', price: 25 },
      { date: '07 ', month:'Feb' , time: 'Fri, 7 Feb 2025 10:00am', status: 'STARTED', service: 'Hair Color', customer: 'Jane Doe', duration: '1h 15min', staff: 'Tejaswini', price: 57 },
      { date: '07 ',month:'Feb' , time: 'Fri, 7 Feb 2025 10:00am', status: 'BOOKED', service: 'Haircut', customer: 'John Doe', duration: '45min', staff: 'Tejaswini', price: 40 }

  ]
}
