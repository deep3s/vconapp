import {Component, NgZone} from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'color-picker-component',
  templateUrl: './color-picker-component.html',
  styleUrls: ['./color-picker-component.scss']
})
export class ColorPickerComponent implements AgRendererComponent {

  params: any;
  partyColor: any = '';

  constructor(
    private ngZone: NgZone,
    public dialog: MatDialog) {
  }

  agInit(params: any): void {
    this.params = params;
    this.partyColor = this.params.value;
    console.log('value', this.partyColor)
  }

  refresh(params: any): boolean {
    return false;
  }

  openRidings(): void {

    this.ngZone.run(() => {

    });
  }

}
