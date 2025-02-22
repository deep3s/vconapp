import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BusinessSetupService {
  apiBaseUrl='http://localhost:8080';
  businessDetailsUrl=`${this.apiBaseUrl}/businessSetup`;

  private businessInfo: Subject<any>= new Subject<any>();

  constructor(private http: HttpClient) { }

  saveBusinessDetails(businessDetails: any): Observable<any> {
    return this.http.post<any>(`${this.businessDetailsUrl}`, businessDetails);
  }

  saveBusinessInfo(data: any): void {
    this.businessInfo.next(data);
  }

  getBusinessInfo(): Observable<any> {
    return this.businessInfo.asObservable();
  }

}
