import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyEmailAlertsService {
  analystsUrl = '/assets/data/analysts.json';

  constructor(private http: HttpClient) {
  }

  getAnalysts(): Observable<any> {
    return this.http.get(`${this.analystsUrl}`);
  }
}
