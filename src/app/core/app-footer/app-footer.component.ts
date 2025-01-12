import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss']
})
export class AppFooterComponent implements OnInit {
  dateNow = '';
  constructor() { }

  ngOnInit(): void {
    this.dateNow = moment().format('MMMM D, YYYY') + ' at ' + moment().format('h:mm:ss a') + ' EDT';
  }

}
