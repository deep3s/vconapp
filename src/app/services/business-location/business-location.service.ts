import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BusinessLocationService {

  apiBaseUrl='http://localhost:8080';
  businessLocationDetailsUrl=`${this.apiBaseUrl}/businessLocation`;
  searchBusinessLocationsUrl=`${this.apiBaseUrl}/businessLocation/search`;

  constructor(private http: HttpClient) { }

  saveBusinessLocationDetails(businessLocationDetails: any): Observable<any> {
    return this.http.post<any>(`${this.businessLocationDetailsUrl}`, businessLocationDetails);
  }

  getAllBusinessLocations(): Observable<any> {
    return this.http.get<any>(`${this.businessLocationDetailsUrl}`);
  }

  searchBusinessLocations(lat: number, lng: number, radius = 10): Observable<any> {
    const params = new HttpParams()
        .set('latitude', lat)
        .set('longitude', lng)
        .set('radius', radius);
    return this.http.get<any>(`${this.searchBusinessLocationsUrl}`, {params});
  }
}