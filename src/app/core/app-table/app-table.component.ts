import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './app-table.component.html',
    styleUrls: ['./app-table.component.scss']
})
export class AppTableComponent {
    @Input() data: any;

    @Output() linkClicked = new EventEmitter();

    overview = {
        headings: [
            {colClass: 'col-6 fw-medium ', name: 'Name', icon: ''},
            {colClass: 'col-6 fw-medium  d-flex justify-content-end pr-3', name: 'Amount'},
        ],
        rows: [
            [
                {
                    colClass: 'col-6 clr-burgandy d-flex insight align-items-center',
                    name: 'Revenue'
                },
                {colClass: 'col-6 d-flex justify-content-end', name: '$210.20M'},
            ],
            [
                {
                    colClass: 'col-6 clr-burgandy d-flex insight align-items-center',
                    name: 'Revenue'
                },
                {colClass: 'col-6 d-flex justify-content-end', name: '$210.20M'},
            ],
        ]
    };


    constructor() {
    }

    isArray(obj: any): boolean {
        return Array.isArray(obj);
    }

    onLinkClicked(value): void{
        this.linkClicked.emit(value);
    }
}
