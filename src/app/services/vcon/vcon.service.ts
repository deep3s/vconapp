import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {ElectionService} from "../election/election.service";

@Injectable({
    providedIn: 'root'
})
export class VconService {
    baseUrl = 'http://localhost:8080/api';

    allSalons=`${this.baseUrl}/salons`;
    constructor(private http: HttpClient) {
    }



    getAllSalons(): Observable<any>{
        return this.http.get<any>(`${this.allSalons}`);

    }
    postElected(data): Observable<any> {
        return this.http.post(`${this.allSalons}`, {}, {
            params: data
        });
    }


}
