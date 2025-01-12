import { Component, Input, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: 'app-riding-status-card',
  templateUrl: './riding-status-card.component.html',
  styleUrls: ['./riding-status-card.component.scss']
})
export class RidingStatusCardComponent implements OnInit, ICellRendererAngularComp {
  @Input() statusData: any = {};

  agInit(params: any) {
    this.statusData = params.statusData;
  }

  ngOnInit() {}

  refresh(params: any): boolean {
    this.statusData = params.statusData;
    return true;
  }
}