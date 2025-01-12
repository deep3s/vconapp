import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyRidingsService {
    apiBaseUrl='https://1tzyvxi01f.execute-api.us-east-1.amazonaws.com/dev';
    ridingnamesUrl=`${this.apiBaseUrl}/riding-names`;
    constructor(private http: HttpClient) {
    }

    getMyRidingsNames(): Observable<any>{
       return this.http.get<any>(`${this.ridingnamesUrl}`);
    }
  }
