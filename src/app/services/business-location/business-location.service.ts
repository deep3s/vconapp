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

  createBusinessLocationDetails(businessLocationDetails: any): Observable<any> {
    return this.http.post<any>(`${this.businessLocationDetailsUrl}`, businessLocationDetails);
  }

  updateBusinessLocationDetails(businessLocationDetails: any): Observable<any> {
    return this.http.put<any>(`${this.businessLocationDetailsUrl}/${businessLocationDetails.id}`, businessLocationDetails);
  }

  getAllBusinessLocations(): Observable<any> {
    return this.http.get<any>(`${this.businessLocationDetailsUrl}`);
  }

  getBusinessLocationById(blId: string): Observable<any> {
    return this.http.get<any>(`${this.businessLocationDetailsUrl}/${blId}`);
  }

  searchBusinessLocations(lat: number, lng: number, radius = 10): Observable<any> {
    const params = new HttpParams()
        .set('latitude', lat)
        .set('longitude', lng)
        .set('radius', radius);
    return this.http.get<any>(`${this.searchBusinessLocationsUrl}`, {params});
  }
}
