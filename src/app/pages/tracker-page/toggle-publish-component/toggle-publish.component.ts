import {Component, NgZone} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AgRendererComponent} from 'ag-grid-angular';
import {ApplicationService} from '../../../services/application/application.service';
import {MatDialog} from "@angular/material/dialog";
import {PublishModalComponent} from "../publish-modal/publish-modal.component";

@Component({
  selector: 'toggle-publish-component',
  templateUrl: '/toggle-publish.component.html',
  styleUrls: ['./toggle-publish.component.scss']
})
export class TogglePublishComponent implements AgRendererComponent {

  params: any;
  isChecked = false;
  isNA = false;

  constructor(
    private ngZone: NgZone,
    public dialog: MatDialog,
    private applicationService: ApplicationService) {
  }

  agInit(params: any): void {
    this.params = params;
    this.isChecked = params.value;
    this.isNA = params.data.status === 'No image';
  }

  refresh(params: any): boolean {
    return false;
  }

  assignPublishedFlag(event): void {
    if (this.params.value) return;

    event.stopPropagation();
    event.preventDefault();

    this.params.value = this.isChecked;
    const dialogRef = this.dialog.open(PublishModalComponent, {
      width: '600px',
      disableClose: true, 
      data: {article: this.params.data.article_slugline}
    });
    this.ngZone.run(() => {

    });
  }

}
