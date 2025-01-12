import { Component, Input, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";

@Component({
  selector: "app-status-card",
  templateUrl: "./status-card.component.html",
  styleUrls: ["./status-card.component.scss"],
})
export class StatusCardComponent implements OnInit, ICellRendererAngularComp {
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
