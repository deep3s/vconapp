import {Component, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgRendererComponent} from 'ag-grid-angular';
import {ApplicationService} from '../../../services/application/application.service';
import {MatDialog} from "@angular/material/dialog";
import {PublishModalComponent} from "../publish-modal/publish-modal.component";

@Component({
  selector: 'no-image-component',
  templateUrl: '/no-image.component.html',
  styleUrls: ['./no-image.component.scss']
})
export class NoImageComponent implements AgRendererComponent {

  params: any;
  cellValue = false;
  isNA = false;

  constructor(
    private ngZone: NgZone,
    public dialog: MatDialog,
    private applicationService: ApplicationService) {
  }

  agInit(params: any): void {
    this.params = params;
    this.cellValue = params.value;
    this.isNA = params.data.status === 'No image';
  }

  refresh(params: any): boolean {
    return false;
  }

}
