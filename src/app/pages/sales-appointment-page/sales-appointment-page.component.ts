import {Component} from '@angular/core';

@Component({
    selector: 'app-sales-appointment-page',
    templateUrl: './sales-appointment-page.component.html',
    styleUrls: ['./sales-appointment-page.component.scss']
})
export class SalesAppointmentPageComponent {
    appointments = [
        {
            ref: '#6FEEA72E',
            client: 'Walk-In',
            service: 'Haircut',
            createdBy: 'Tejaswini G',
            createdDate: '7 Feb 2025, 4:00pm',
            scheduledDate: '7 Feb 2025, 6:00pm',
            duration: '45min',
            location: 'V-Cut unisex Salon',
            teamMember: 'Tejaswini G',
            price: 40.00,
            status: 'Booked'
        },
        {
            ref: '#D8E8A5AD',
            client: 'Walk-In',
            service: 'Haircut',
            createdBy: 'Tejaswini G',
            createdDate: '7 Feb 2025, 4:00pm',
            scheduledDate: '7 Feb 2025, 2:30pm',
            duration: '45min',
            location: 'V-Cut unisex Salon',
            teamMember: 'Tejaswini G',
            price: 40.00,
            status: 'Booked'
        },
        {
            ref: '#31F5DD4B',
            client: 'Jane Doe',
            service: 'Hair Color',
            createdBy: 'Tejaswini G',
            createdDate: '7 Feb 2025, 11:28am',
            scheduledDate: '7 Feb 2025, 1:00pm',
            duration: '1h 15min',
            location: 'V-Cut unisex Salon',
            teamMember: 'Tejaswini G',
            price: 57.00,
            status: 'Started'
        },
        {
            ref: '#0C05A304',
            client: 'John Doe',
            service: 'Haircut',
            createdBy: 'Tejaswini G',
            createdDate: '7 Feb 2025, 11:28am',
            scheduledDate: '7 Feb 2025, 11:00am',
            duration: '45min',
            location: 'V-Cut unisex Salon',
            teamMember: 'Tejaswini G',
            price: 40.00,
            status: 'Booked'
        },
        {
            ref: '#767A9D53',
            client: 'Jack Doe',
            service: 'Manicure',
            createdBy: 'Tejaswini G',
            createdDate: '7 Feb 2025, 11:28am',
            scheduledDate: '7 Feb 2025, 10:00am',
            duration: '45min',
            location: 'V-Cut unisex Salon',
            teamMember: 'Wendy Smith (Demo)',
            price: 25.00,
            status: 'Booked'
        }
    ];

    getStatusClass(status: string) {
        return {
            'bg-primary text-white': status === 'Booked',
            'bg-success text-white': status === 'Started'
        };
    }
}