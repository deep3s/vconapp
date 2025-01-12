import {AfterViewInit, Component, HostListener, Inject, NgZone, OnInit, Pipe, PipeTransform} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AgRendererComponent} from "ag-grid-angular";
import {MyRidingsModalComponent} from "../my-ridings-modal/my-ridings-modal.component";

@Component({
    selector: 'candidate-names',
    templateUrl: './candidate-names.component.html',
    styleUrls: ['./candidate-names.component.scss']
})
export class CandidateNamesComponent implements AgRendererComponent {

    params: any;

    constructor(
        private ngZone: NgZone,
        public dialog: MatDialog) {
    }

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
    }

}
