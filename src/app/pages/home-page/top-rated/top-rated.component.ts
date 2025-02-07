import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'top-rated',
  templateUrl: './top-rated.component.html',
  styleUrls: ['./top-rated.component.scss']
})
export class TopRatedComponent implements OnInit {
  topRatedData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('assets/top-rated-data.json').subscribe(data => {
      this.topRatedData = data;
    });
  }
}
