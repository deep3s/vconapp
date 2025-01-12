import {Component} from '@angular/core';
import {ITooltipParams} from "ag-grid-community";
import {ITooltipAngularComp} from "ag-grid-angular";
import {MatDialog} from "@angular/material/dialog";
import {PublishModalComponent} from "../../tracker-page/publish-modal/publish-modal.component";

@Component({
  selector: 'tooltip-component',
  template: `
    <div class="hover-img-container">
      <img class="publisher-large-thumbnail" [src]="data.thumbnail" />
    </div>`,
  styleUrls: ['./publisher-thumbnail-tooltip.component.scss']
})
export class PublisherThumbnailTooltipComponent implements ITooltipAngularComp {
  private params!: {color: string} & ITooltipParams;
  public data!: any;
  public color!: string;
  constructor(
    public dialog: MatDialog) {
  }

  agInit(params: {color: string} & ITooltipParams): void {
    this.params = params;

    // @ts-ignore
    this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.color = this.params.color || 'white';
  }

  publish(){
    const dialogRef = this.dialog.open(PublishModalComponent, {
      width: '400px',
      disableClose: true, 
      data: {}
    });
  }
}
