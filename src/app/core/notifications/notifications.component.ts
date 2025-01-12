import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
    isContainerOpened = false;

    notifications = [
        {
            name: 'Michal Horak',
            date: '03/29/2023',
            desc: 'Article In-The-News Published',
            id: 1,
        },
        {
            name: 'Fatima Abdillahi',
            date: '03/24/2023',
            desc: 'Thumbnail "TCP Professional" Updated',
            id: 2
        },
        {
            name: 'Sabina Gergel',
            date: '03/21/2023',
            desc: 'Article "Ont-Toronto-Council" Published',
            id: 3
        }
    ];

    constructor(public router: Router) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
            this.isContainerOpened = false;
        });
    }

    ngOnInit(): void {
    }

    toggleContainer(toggle): void {
        if (toggle === null) {
            this.isContainerOpened = !this.isContainerOpened;
        } else {
            this.isContainerOpened = toggle;
        }
    }

    hideNotification(notification, event): void {
        event.preventDefault();
        event.stopPropagation();

        this.notifications = this.notifications.filter(notn => {
            return notn.id !== notification.id;
        });
    }

    clickedOutOfNotification(event): void {
        /*event.stopPropagation();
        event.preventDefault();*/

        this.isContainerOpened = false;
    }
}
