import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BusinessSetupService {
  apiBaseUrl='http://localhost:8080';
  businessDetailsUrl=`${this.apiBaseUrl}/api/business-setup/business-details`;
  constructor(private http: HttpClient) { }

  saveBusinessDetails(businessDetails: any): Observable<any> {
    return this.http.post<any>(`${this.businessDetailsUrl}`, businessDetails);
  }

}
