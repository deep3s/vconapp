import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BusinessLocationService {

  apiBaseUrl='http://localhost:8080';
  businessLocationDetailsUrl=`${this.apiBaseUrl}/businessLocation`;

  constructor(private http: HttpClient) { }

  saveBusinessLocationDetails(businessLocationDetails: any): Observable<any> {
    return this.http.post<any>(`${this.businessLocationDetailsUrl}`, businessLocationDetails);
  }
}
