import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class BusinessSetupService {
    apiBaseUrl = 'http://localhost:8080';
    businessDetailsUrl = `${this.apiBaseUrl}/businessSetup`;

    private businessInfo: Subject<any> = new Subject<any>();

    constructor(private http: HttpClient) {
    }

    saveBusinessDetails(businessDetails: any): Observable<any> {
        return this.http.post<any>(`${this.businessDetailsUrl}`, businessDetails);
    }

    updateBusinessDetails(businessDetails: any): Observable<any> {
        return this.http.put<any>(`${this.businessDetailsUrl}/${businessDetails.id}`, businessDetails);
    }

    getBusinessDetails(id: string = '67b9f87ac5d06022e6fec04e'): Observable<any> {
        const params = new HttpParams().set('id', id);

        return this.http.get<any>(`${this.businessDetailsUrl}`, {params});
    }

    saveBusinessInfo(data: any): void {
        this.businessInfo.next(data);
    }

    getBusinessInfo(): Observable<any> {
        return this.businessInfo.asObservable();
    }
}
