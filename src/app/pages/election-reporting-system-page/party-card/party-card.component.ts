import { Component, Input, OnInit } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { getPartyFullName } from "../../../shared/parties-constants";

@Component({
  selector: "app-party-card",
  templateUrl: "./party-card.component.html",
  styleUrls: ["./party-card.component.scss"],
})
export class PartyCardComponent implements OnInit, ICellRendererAngularComp {
  @Input() partyData: any = {};
  @Input() partyNameTool: any = {};

  agInit(params: any) {
    this.partyData = (Array.isArray(params.partyData)) ? params.partyData : [params.partyData];
  }

  ngOnInit() { }

  refresh(params: any): boolean {
    this.partyData = (Array.isArray(params.partyData)) ? params.partyData : [params.partyData];
    return true;
  }
}
